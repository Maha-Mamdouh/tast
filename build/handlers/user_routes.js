"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const global_1 = __importDefault(require("../midllewares/global"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new users_1.UserStore();
const index = async (_req, res) => {
    const users = await store.index();
    res.json(users);
};
const show = async (req, res) => {
    const user = await store.show(req.params.id);
    res.json(user);
};
const create = async (req, res) => {
    const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        balance: req.body.balance,
        email: req.body.email,
        password: req.body.password,
    };
    try {
        const newUser = await store.create(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.NEW_USER_TOKEN);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
};
const update = async (req, res) => {
    try {
        //p.first_name, p.last_name, p.balance,p.email,p.password
        const user = {
            id: req.params.id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            balance: req.body.balance,
            email: req.body.email,
            password: req.body.password,
        };
        const updateUser = await store.update(user);
        res.json(updateUser);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const userRoutes = (app) => {
    app.get("/users", index);
    app.get("/users/:id", global_1.default, show);
    app.post("/users", create);
    app.delete("/users/:id", global_1.default, destroy);
    app.patch("/users/:id", global_1.default, update);
};
exports.default = userRoutes;
