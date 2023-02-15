"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const watchLists_1 = require("../models/watchLists");
const global_1 = __importDefault(require("../midllewares/global"));
const lst = new watchLists_1.userList();
const index = async (_req, res) => {
    const movies = await lst.index();
    res.json(movies);
};
const show = async (req, res) => {
    const movie = await lst.show(req.params.id);
    res.json(movie);
};
const create = async (req, res) => {
    try {
        const list = {
            user_id: req.body.user_id,
            movie_id: req.body.movie_id,
        };
        const newEntity = await lst.create(list);
        res.json(newEntity);
        console.log(newEntity);
    }
    catch (err) {
        console.log(err);
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    const deleted = await lst.delete(req.body.id);
    res.json(deleted);
};
const update = async (req, res) => {
    try {
        const movie = {
            id: req.params.id,
            user_id: req.body.user_id,
            movie_id: req.body.movie_id,
        };
        const updateMovie = await lst.update(movie);
        res.json(updateMovie);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const listRoutes = (app) => {
    app.get("/watchlist", index);
    app.get("/watchlist/:id", global_1.default, show);
    app.post("/watchlist", create);
    app.delete("/watchlist/:id", global_1.default, destroy);
    app.patch("/watchlist/:id", global_1.default, update);
};
exports.default = listRoutes;
