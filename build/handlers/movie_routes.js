"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const movies_1 = require("../models/movies");
const global_1 = __importDefault(require("../midllewares/global"));
const store = new movies_1.MovieStore();
const index = async (_req, res) => {
    const movies = await store.index();
    res.json(movies);
};
const show = async (req, res) => {
    const movie = await store.show(req.params.id);
    res.json(movie);
};
const create = async (req, res) => {
    try {
        const movie = {
            name: req.body.name,
            release_date: req.body.release_date,
        };
        const newMovie = await store.create(movie);
        res.json(newMovie);
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
        const movie = {
            id: req.params.id,
            name: req.body.name,
            release_date: req.body.release_date,
        };
        const updateMovie = await store.update(movie);
        res.json(updateMovie);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const movieRoutes = (app) => {
    app.get("/movies", index);
    app.get("/movies/:id", global_1.default, show);
    app.post("/movies", create);
    app.delete("/movies/:id", global_1.default, destroy);
    app.patch("/movies/:id", global_1.default, update);
};
exports.default = movieRoutes;
