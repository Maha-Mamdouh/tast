"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class UserStore {
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            console.log(result);
            conn.release();
            if (result.rows[0] == undefined) {
                throw new Error(`Could not find user ${id} empty table`);
            }
            else {
                return result.rows[0];
            }
        }
        catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }
    async create(p) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            //     id,first_name,last_name,balance,email,password
            const sql = 'INSERT INTO users ( first_name,last_name,balance,email,password) VALUES($1, $2, $3, $4) RETURNING *';
            const result = await conn.query(sql, [p.first_name, p.last_name, p.balance, p.email, p.password]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not add new user ${p.first_name + ' ' + p.last_name}. Error: ${err}`);
        }
    }
    async update(p) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            console.log(conn);
            //     id,first_name,last_name,balance,email,password
            const sql = 'Update users set first_name = $2,last_name = $3 , balance= $4,email= $5,password= $6 where id =$1  RETURNING *';
            const result = await conn.query(sql, [p.id, p.first_name, p.last_name, p.balance, p.email, p.password]);
            const user = result.rows[0];
            console.log(user);
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not update new user ${p.first_name + ' ' + p.last_name}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            const User = result.rows[0];
            conn.release();
            return User;
        }
        catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`);
        }
    }
}
exports.UserStore = UserStore;
