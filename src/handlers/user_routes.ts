import express, { Request, Response } from "express";
import { User, UserStore } from "../models/users";
import verifyAuthToken from "../midllewares/global";
import jwt from "jsonwebtoken";

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  const user = await store.show(req.params.id);
  res.json(user);
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    balance: req.body.balance,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const newUser = await store.create(user);
    const token = jwt.sign(
      { user: newUser },
      process.env.NEW_USER_TOKEN as string
    );
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id);
  res.json(deleted);
};

const update = async (req: Request, res: Response) => {
  try {
    //p.first_name, p.last_name, p.balance,p.email,p.password
    const user: User = {
      id: req.params.id as unknown as number,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      balance: req.body.balance,
      email: req.body.email,
      password: req.body.password,
    };
    const updateUser = await store.update(user);
    res.json(updateUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const userRoutes = (app: express.Application) => {
  app.get("/users", index);
  app.get("/users/:id", verifyAuthToken, show);
  app.post("/users", create);
  app.delete("/users/:id", verifyAuthToken, destroy);
  app.patch("/users/:id", verifyAuthToken, update);
};

export default userRoutes;
