"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
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
    try {
        //p.first_name, p.last_name, p.balance,p.email,p.password
        const user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            balance: req.body.balance,
            email: req.body.email,
            password: req.body.password
        };
        const newUser = await store.create(user);
        res.json(newUser);
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
        console.log('here');
        const user = {
            id: req.params.id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            balance: req.body.balance,
            email: req.body.email,
            password: req.body.password
        };
        console.log(user);
        const updateUser = await store.update(user);
        res.json(updateUser);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const UserRoutes = (app) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', create);
    app.delete('/users/:id', destroy);
    app.patch('/users/:id', update);
};
exports.default = UserRoutes;
