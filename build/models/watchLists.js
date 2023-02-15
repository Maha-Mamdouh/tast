"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userList = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class userList {
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM user_list';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not acces the list. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM user_list WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            if (result.rows[0] == undefined) {
                return `Could not find id ${id}. Empty table`;
            }
            else {
                return result.rows[0];
            }
        }
        catch (err) {
            throw new Error(`Could not find id=${id}. Error: ${err}`);
        }
    }
    async create(l) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO user_list (user_id, movie_id) VALUES($1, $2) RETURNING *';
            const result = await conn.query(sql, [l.user_id, l.movie_id]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not add  movie with id ${l.movie_id} to user ${l.user_id}. Error: ${err}`);
        }
    }
    async update(l) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'Update user_list set user_id = $2, movie_id = $3 WHERE id =$1 RETURNING *';
            const result = await conn.query(sql, [l.id, l.user_id, l.movie_id]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not update new movie with id ${l.movie_id} to user ${l.user_id}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM user_list WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not delete watched entity with id= ${id}. Error: ${err}`);
        }
    }
}
exports.userList = userList;
