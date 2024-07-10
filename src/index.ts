import express, { Request, Response } from "express";
import { routerUsers } from "./routers/users";
import { Marketplace } from "./App";

const app = express();
const server = express.json();
const routerApi = express.Router();
const MyApp = new Marketplace();

// routerApi.use("/users", routerUsers)

app.use(server);

app.get("/auth/logout", (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) return res.status(400).json({message: "Missing token"});
    console.log((token));
    if (!MyApp.isTokenValid((token))) return res.status(400).json({message: "Invalid token", token: typeof token});
    else return res.json(MyApp.logout((token)));
})

app.get("/users", (req: Request, res: Response) => {
    return res.json(MyApp.readUsersList());
});

app.get("/ads", (req: Request, res: Response) => {
    return res.json(MyApp.readAdsList());
})

app.get("/ads/:primaryKeyAd", (req: Request, res: Response) => {
    const idAd = req.params.primaryKeyAd;
    return res.json(MyApp.readAdDetails(idAd));
})

app.get("/reviews", (req: Request, res: Response) => {
    return res.json(MyApp.readReviewsList());
})

app.delete("/user/:referenceKeyUser", (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) return res.status(400).json({message: "Missing token"});
    if (!MyApp.isTokenValid((token))) return res.status(400).json({message: "Invalid token", token: typeof token});
    else return res.json(MyApp.deleteAccount(token));
})

app.put("/user/:referenceKeyUser", (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) return res.status(400).json({message: "Missing token"});
    if (!MyApp.isTokenValid((token))) return res.status(400).json({message: "Invalid token", token: typeof token});
    else {
        const newUsername = req.body.username;
        return res.json(MyApp.updateUsername(newUsername, token));
    }
})

app.patch("/ads/:referenceKeyAd", (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) return res.status(400).json({message: "Missing token"});
    if (!MyApp.isTokenValid((token))) return res.status(400).json({message: "Invalid token", token: typeof token});
    else {
        const newTitle = req.body.title;
        const newDescription = req.body.description;
        const newPrice = req.body.price;
        const newCategory = req.body.category;
        const newCondition = req.body.condition;
        const newURLimage = req.body.URLimage;
        const newAddress = req.body.address;
        return res.json(MyApp.updateAd(req.params.referenceKeyAd, token, newTitle, newDescription, newPrice, newCategory, newCondition, newURLimage, newAddress));
    }
})

app.patch("/reviews/:referenceKeyAd", (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) return res.status(400).json({message: "Missing token"});
    if (!MyApp.isTokenValid((token))) return res.status(400).json({message: "Invalid token", token: typeof token});
    else {
        const newTitle = req.body.title;
        const newDescription = req.body.description;
        const newRating = req.body.rating;
        return res.json(MyApp.updateReview(token, req.params.referenceKeyAd, newTitle, newDescription, newRating));
    }
})

app.delete("/ads/:referenceKeyAd", (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) return res.status(400).json({message: "Missing token"});
    if (!MyApp.isTokenValid((token))) return res.status(400).json({message: "Invalid token", token: typeof token});
    else {
        return res.json(MyApp.deleteAd(token, req.params.referenceKeyAd));
    }
})

app.post("/auth/login", (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    if (email === "") return res.status(400).json({message: "Missing email"});
    if (password === "") return res.status(400).json({message: "Missing password"});
    const user = MyApp.login(email, password);
    if (!!user) return res.status(200).json({token: user.token});
    else return res.status(400).json({message: "Error"});
})

app.post("/auth/register", (req: Request, res: Response) => {
      const email = req.body.email;
      const password = req.body.password;

      if (email === "") return res.status(400).json({message: "Missing email"});
      if (password === "") return res.status(400).json({message: "Missing password"});

      const success = MyApp.register(email, password);

      if (success) return res.status(200).json({message: "Success"}); 
      else return res.status(400).json({message: "Error"});
      
})

app.post("/ads", (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) return res.status(400).json({message: "Missing token"});
    if (!MyApp.isTokenValid((token))) return res.status(400).json({message: "Invalid token", token: typeof token});
    else {
        const title = req.body.title;
        const description = req.body.description;
        const price = req.body.price;
        const category = req.body.category;
        const condition = req.body.condition;
        const URLimage = req.body.URLimage;
        const address = req.body.address;
        const newAdCreated = MyApp.createAd(token, title, description, price, category, condition, URLimage, address);

        if (newAdCreated) return res.status(200).json(newAdCreated);
        else return res.status(400).json({message: "Error"});
    }

    
})

app.post("/reviews/:referenceKeyAd", (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) return res.status(400).json({message: "Missing token"});
    if (!MyApp.isTokenValid((token))) return res.status(400).json({message: "Invalid token", token: typeof token});
    else {
        const title = req.body.title;
        const description = req.body.description;
        const rating = req.body.rating;
        const referenceKeyAd = req.body.referenceKeyAd;
        const newReviewCreated = MyApp.createReview(token, referenceKeyAd, title, description, rating);     

        if (newReviewCreated) return res.status(200).json(newReviewCreated);
        else return res.status(400).json({message: "Error"});       
    }
})

app.use("/api", routerApi);

app.listen(3000, () => {
    console.log("server started at http://localhost:3000");
});