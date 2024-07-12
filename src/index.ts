import express, { Request, Response } from "express";
import { Marketplace } from "./App";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
const server = express.json();
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API with Swagger',
            version: '1.0.0',
            description: 'A simple Express API application',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./src/**/*.ts'], // Percorso ai file delle rotte
};

const swaggerDocument = swaggerJSDoc(swaggerOptions);

const MyApp = new Marketplace();

const port = process.env.PORT || 3000;

app.use(server);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns a greeting message
 *     responses:
 *       200:
 *         description: A greeting message
 */
app.get("/", (req: Request, res: Response) => {
    return res.send("Hello World!");
});

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logs out a user
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token
 *     responses:
 *       200:
 *         description: User logged out
 *       400:
 *         description: Missing or invalid token
 */
app.get("/auth/logout", (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) return res.status(400).json({message: "Missing token"});
    console.log((token));
    if (!MyApp.isTokenValid((token))) return res.status(400).json({message: "Invalid token", token: typeof token});
    else return res.json(MyApp.logout((token)));
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieves a list of users
 *     responses:
 *       200:
 *         description: A list of users
 */
app.get("/users", (req: Request, res: Response) => {
    return res.json(MyApp.readUsersList());
});

/**
 * @swagger
 * /ads:
 *   get:
 *     summary: Retrieves a list of ads
 *     responses:
 *       200:
 *         description: A list of ads
 */
app.get("/ads", (req: Request, res: Response) => {
    return res.json(MyApp.readAdsList());
});

/**
 * @swagger
 * /ads/{primaryKeyAd}:
 *   get:
 *     summary: Retrieves ad details by ID
 *     parameters:
 *       - in: path
 *         name: primaryKeyAd
 *         schema:
 *           type: string
 *         required: true
 *         description: Ad ID
 *     responses:
 *       200:
 *         description: Ad details
 */
app.get("/ads/:primaryKeyAd", (req: Request, res: Response) => {
    const idAd = req.params.primaryKeyAd;
    return res.json(MyApp.readAdDetails(idAd));
});

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Retrieves a list of reviews
 *     responses:
 *       200:
 *         description: A list of reviews
 */
app.get("/reviews", (req: Request, res: Response) => {
    return res.json(MyApp.readReviewsList());
});

/**
 * @swagger
 * /ads/category/{category}:
 *   get:
 *     summary: Retrieves a list of ads by category
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: Ad category
 *     responses:
 *       200:
 *         description: A list of ads by category
 */
app.get("/ads/category/:category", (req: Request, res: Response) => {
    const category = req.params.category;
    return res.json(MyApp.readFilterList(category));
});

/**
 * @swagger
 * /ads/{referenceKeyAd}:
 *   delete:
 *     summary: Deletes an ad by ID
 *     parameters:
 *       - in: path
 *         name: referenceKeyAd
 *         schema:
 *           type: string
 *         required: true
 *         description: Ad ID
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token
 *     responses:
 *       200:
 *         description: Ad deleted
 *       400:
 *         description: Missing or invalid token
 */
app.delete("/ads/:referenceKeyAd", (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) return res.status(400).json({message: "Missing token"});
    if (!MyApp.isTokenValid((token))) return res.status(400).json({message: "Invalid token", token: typeof token});
    else {
        return res.json(MyApp.deleteAd(token, req.params.referenceKeyAd));
    }
});

/**
 * @swagger
 * /user/{referenceKeyUser}:
 *   delete:
 *     summary: Deletes a user by ID
 *     parameters:
 *       - in: path
 *         name: referenceKeyUser
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token
 *     responses:
 *       200:
 *         description: User deleted
 *       400:
 *         description: Missing or invalid token
 */
app.delete("/user/:referenceKeyUser", (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) return res.status(400).json({message: "Missing token"});
    if (!MyApp.isTokenValid((token))) return res.status(400).json({message: "Invalid token", token: typeof token});
    else return res.json(MyApp.deleteAccount(token));
});

/**
 * @swagger
 * /user/{referenceKeyUser}:
 *   put:
 *     summary: Updates a user by ID
 *     parameters:
 *       - in: path
 *         name: referenceKeyUser
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token
 *       - in: body
 *         name: user
 *         description: The user to update
 *         schema:
 *           type: object
 *           required:
 *             - username
 *           properties:
 *             username:
 *               type: string
 *     responses:
 *       200:
 *         description: User updated
 *       400:
 *         description: Missing or invalid token
 */
app.put("/user/:referenceKeyUser", (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) return res.status(400).json({message: "Missing token"});
    if (!MyApp.isTokenValid((token))) return res.status(400).json({message: "Invalid token", token: typeof token});
    else {
        const newUsername = req.body.username;
        return res.json(MyApp.updateUsername(newUsername, token));
    }
});

/**
 * @swagger
 * /ads/{referenceKeyAd}:
 *   patch:
 *     summary: Updates an ad by ID
 *     parameters:
 *       - in: path
 *         name: referenceKeyAd
 *         schema:
 *           type: string
 *         required: true
 *         description: Ad ID
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token
 *       - in: body
 *         name: ad
 *         description: The ad to update
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             price:
 *               type: number
 *             category:
 *               type: string
 *             condition:
 *               type: string
 *             URLimage:
 *               type: string
 *             address:
 *               type: string
 *     responses:
 *       200:
 *         description: Ad updated
 *       400:
 *         description: Missing or invalid token
 */
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
});

/**
 * @swagger
 * /reviews/{referenceKeyAd}:
 *   delete:
 *     summary: Deletes a review by ad ID
 *     parameters:
 *       - in: path
 *         name: referenceKeyAd
 *         schema:
 *           type: string
 *         required: true
 *         description: Ad ID
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token
 *     responses:
 *       200:
 *         description: Review deleted
 *       400:
 *         description: Missing or invalid token
 */
app.delete("/reviews/:referenceKeyAd", (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) return res.status(400).json({message: "Missing token"});
    if (!MyApp.isTokenValid((token))) return res.status(400).json({message: "Invalid token", token: typeof token});
    else {
        return res.json(MyApp.deleteReview(token, req.params.referenceKeyAd));
    }
});

/**
 * @swagger
 * /reviews/{referenceKeyAd}:
 *   patch:
 *     summary: Updates a review by ad ID
 *     parameters:
 *       - in: path
 *         name: referenceKeyAd
 *         schema:
 *           type: string
 *         required: true
 *         description: Ad ID
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token
 *       - in: body
 *         name: review
 *         description: The review to update
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             rating:
 *               type: number
 *     responses:
 *       200:
 *         description: Review updated
 *       400:
 *         description: Missing or invalid token
 */
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
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Logs in a user
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: The user's credentials
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: User logged in
 *       400:
 *         description: Missing email or password
 */
app.post("/auth/login", (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    if (email === "") return res.status(400).json({message: "Missing email"});
    if (password === "") return res.status(400).json({message: "Missing password"});
    const user = MyApp.login(email, password);
    if (!!user) return res.status(200).json({token: user.token});
    else return res.status(400).json({message: "Error"});
});

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registers a new user
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: The user's credentials
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: User registered
 *       400:
 *         description: Missing email or password
 */
app.post("/auth/register", (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;

    if (email === "") return res.status(400).json({message: "Missing email"});
    if (password === "") return res.status(400).json({message: "Missing password"});

    const success = MyApp.register(email, password);

    if (success) return res.status(200).json({message: "Success"}); 
    else return res.status(400).json({message: "Error"});
});

/**
 * @swagger
 * /ads:
 *   post:
 *     summary: Creates a new ad
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token
 *       - in: body
 *         name: ad
 *         description: The ad to create
 *         schema:
 *           type: object
 *           required:
 *             - title
 *             - description
 *             - price
 *             - category
 *             - condition
 *             - URLimage
 *             - address
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             price:
 *               type: number
 *             category:
 *               type: string
 *             condition:
 *               type: string
 *             URLimage:
 *               type: string
 *             address:
 *               type: string
 *     responses:
 *       200:
 *         description: Ad created
 *       400:
 *         description: Missing or invalid token
 */
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
});

/**
 * @swagger
 * /reviews/{referenceKeyAd}:
 *   post:
 *     summary: Creates a new review
 *     parameters:
 *       - in: path
 *         name: referenceKeyAd
 *         schema:
 *           type: string
 *         required: true
 *         description: Ad ID
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token
 *       - in: body
 *         name: review
 *         description: The review to create
 *         schema:
 *           type: object
 *           required:
 *             - title
 *             - description
 *             - rating
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             rating:
 *               type: number
 *     responses:
 *       200:
 *         description: Review created
 *       400:
 *         description: Missing or invalid token
 */
app.post("/reviews/:referenceKeyAd", (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) return res.status(400).json({message: "Missing token"});
    if (!MyApp.isTokenValid((token))) return res.status(400).json({message: "Invalid token", token: typeof token});
    else {
        const title = req.body.title;
        const description = req.body.description;
        const rating = req.body.rating;
        const newReviewCreated = MyApp.createReview(token, req.params.referenceKeyAd, title, description, rating);     

        if (newReviewCreated) return res.status(200).json(newReviewCreated);
        else return res.status(400).json({message: "Error"});       
    }
});

/**
 * @swagger
 * /ads/{referenceKeyAd}:
 *   post:
 *     summary: Marks an ad as sold
 *     parameters:
 *       - in: path
 *         name: referenceKeyAd
 *         schema:
 *           type: string
 *         required: true
 *         description: Ad ID
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token
 *       - in: body
 *         name: ad
 *         description: The ad to mark as sold
 *         schema:
 *           type: object
 *           required:
 *             - sold
 *           properties:
 *             sold:
 *               type: boolean
 *     responses:
 *       200:
 *         description: Ad marked as sold
 *       400:
 *         description: Missing or invalid token
 */
app.post("/ads/:referenceKeyAd", (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) return res.status(400).json({message: "Missing token"});
    if (!MyApp.isTokenValid((token))) return res.status(400).json({message: "Invalid token", token: typeof token});
    else {
        const markAsSold = MyApp.markAsSold(token, req.params.referenceKeyAd, req.body.sold);

        if (markAsSold) return res.status(200).json(markAsSold);
        else return res.status(400).json({message: "Error"});
    }
});

/**
 * @swagger
 * /user/ads/bought:
 *   get:
 *     summary: Gets a list of bought ads for the user
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token
 *     responses:
 *       200:
 *         description: List of bought ads
 *       400:
 *         description: Missing or invalid token
 */
app.get("/user/ads/bought", (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) return res.status(400).json({message: "Missing token"});
    if (!MyApp.isTokenValid((token))) return res.status(400).json({message: "Invalid token", token: typeof token});
    else {
        const boughtAds = MyApp.readItemBoughtList(token);
        if (boughtAds) return res.status(200).json(boughtAds);
        else return res.status(400).json({message: "Error"});
    }
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
