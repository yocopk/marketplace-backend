import express, { Request, Response } from "express";

export const routerUsers = express.Router();

routerUsers.get("/", (req: Request, res: Response) => {
   return res.send("Hello World!");
});