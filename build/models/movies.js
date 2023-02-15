"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class MovieStore {
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM movies';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get movies. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM movies WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            if (result.rows[0] == undefined) {
                throw new Error(`Could not find movie ${id} in empty table`);
            }
            else {
                return result.rows[0];
            }
        }
        catch (err) {
            throw new Error(`Could not find movie ${id}. Error: ${err}`);
        }
    }
    async create(m) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO movies ( name, release_date) VALUES($1, $2) RETURNING *';
            const result = await conn.query(sql, [m.name, m.release_date]);
            const movie = result.rows[0];
            conn.release();
            return movie;
        }
        catch (err) {
            throw new Error(`Could not add new movie ${m.name}. Error: ${err}`);
        }
    }
    async update(m) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'Update movies set name = $2, release_date = $3 where id =$1  RETURNING *';
            const result = await conn.query(sql, [m.id, m.name, m.release_date]);
            const movie = result.rows[0];
            conn.release();
            return movie;
        }
        catch (err) {
            throw new Error(`Could not update new movie ${m.name}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM movies WHERE id=($1) RETURNING *';
            const result = await conn.query(sql, [id]);
            const movie = result.rows[0];
            conn.release();
            return movie;
        }
        catch (err) {
            throw new Error(`Could not delete movie ${id}. Error: ${err}`);
        }
    }
}
exports.MovieStore = MovieStore;
