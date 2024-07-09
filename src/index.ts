import express, { Request, Response } from "express";
import { routerUsers } from "./routers/users";
import { Marketplace } from "./App";

const app = express();
const server = express.json();
const routerApi = express.Router();
const MyApp = new Marketplace();

// routerApi.use("/users", routerUsers)

app.use(server);

app.get("/api/ads", (req: Request, res: Response) => {
    return res.json(MyApp.readAdsList());
})

app.get("/api/ads/:primaryKeyAd", (req: Request, res: Response) => {
    const idAd = parseInt(req.params.primaryKeyAd);
    return res.json(MyApp.readAdDetails(idAd));
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
    if (!MyApp.isTokenValid(Number(token))) return res.status(400).json({message: "Invalid token", token: typeof token});

    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;
    const condition = req.body.condition;
    const URLimage = req.body.URLimage;
    const address = req.body.address;
    return res.json(MyApp.createAd(Number(token), title, description, price, category, condition, URLimage, address));
})

app.get("/auth/logout", (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) return res.status(400).json({message: "Missing token"});
    console.log(Number(token));
    if (!MyApp.isTokenValid(Number(token))) return res.status(400).json({message: "Invalid token", token: typeof token});
    else return res.json(MyApp.logout(Number(token)));
})

app.get("/user", (req: Request, res: Response) => {
    return res.json(MyApp.readUsersList());
});

app.use("/api", routerApi);

app.listen(3000, () => {
    console.log("server started at http://localhost:3000");
});