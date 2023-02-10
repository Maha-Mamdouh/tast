// @ts-ignore
import Client from '../database'

export type User = {
    id?: number;
    first_name: string;
    last_name: string;
    balance: number;
    email: string;
    password: string
}

export class UserStore {
  
    async index(): Promise<User[]> {
    try {
        // @ts-ignore
        const conn = await Client.connect()
        const sql = 'SELECT * FROM users'
        const result = await conn.query(sql)
        conn.release()
        return result.rows 
    } 
    catch (err) {
        throw new Error(`Could not get users. Error: ${err}`)
    }
  }

  
  async show(id: string): Promise<User> {
    try {
        // @ts-ignore
        const conn = await Client.connect()
        const sql = 'SELECT * FROM users WHERE id=($1)'
        const result = await conn.query(sql, [id])
        conn.release()
        if(result.rows[0] ==undefined){
            throw new Error(`Could not find user ${id} empty table`)
        }
        else{
        return result.rows[0]
        }
    } 
    catch (err) {
        throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
  }
 
  
  async create(u: User): Promise<User> {
    try {
        // @ts-ignore
        const conn = await Client.connect()       
        //     id,first_name,last_name,balance,email,password
        const sql = 'INSERT INTO users ( first_name, last_name, balance, email, password) VALUES($1, $2, $3, $4, $5) RETURNING *'
        const result = await conn.query(sql, [u.first_name, u.last_name, u.balance,u.email,u.password])
        const user = result.rows[0]
        conn.release()
        return user
    }
    catch (err) {
        throw new Error(`Could not add new user ${u.first_name+' '+u.last_name}. Error: ${err}`)
    }
  }

  async update(u: User): Promise<User> {
    try {
        // @ts-ignore
        const conn = await Client.connect() 
        //     id,first_name,last_name,balance,email,password
        const sql ='Update users set first_name = $2, last_name = $3 , balance= $4, email= $5, password= $6 where id =$1  RETURNING *'

        const result = await conn.query(sql, [u.id,u.first_name, u.last_name, u.balance,u.email,u.password])
        const user = result.rows[0]
        conn.release()
        return user
    }
    catch (err) {
        throw new Error(`Could not update new user ${u.first_name} ${u.last_name}. Error: ${err}`)
    }
  }

  async delete(id: string): Promise<User> {
    try {
        // @ts-ignore
        const conn = await Client.connect()
        const sql = 'DELETE FROM users WHERE id=($1)'
        const result = await conn.query(sql, [id])
        const user = result.rows[0]
        conn.release()
        return user
    } 
    catch (err) {
        throw new Error(`Could not delete user ${id}. Error: ${err}`)
    }
  }


}
