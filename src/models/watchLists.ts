// @ts-ignore
import Client from '../database'

export type List = {
    id?: number;
    user_id: string;
    movie_id: string;
}

export class userList {
    async index(): Promise<List[]> {
    try {
        // @ts-ignore
        const conn = await Client.connect()
        const sql = 'SELECT * FROM user_list'
        const result = await conn.query(sql)
        conn.release()
        return result.rows 
    } 
    catch (err) {
        throw new Error(`Could not acces the list. Error: ${err}`)
    }
  }

  async show(id: string): Promise<List | string> {
    try {
        // @ts-ignore
        const conn = await Client.connect()
        const sql = 'SELECT * FROM user_list WHERE id=($1)'
        const result = await conn.query(sql, [id])
        conn.release()
        if(result.rows[0] ==undefined) {
            return `Could not find id ${id}. Empty table`
        }
        else{
        return result.rows[0]
        }
    } 
    catch (err) {
        throw new Error(`Could not find id=${id}. Error: ${err}`)
    }
  }

  async create(l: List): Promise<List> {
    try {
        // @ts-ignore
        const conn = await Client.connect()       
        const sql = 'INSERT INTO user_list (user_id, movie_id) VALUES($1, $2) RETURNING *'
        const result = await conn.query(sql, [l.user_id, l.movie_id])

        const user = result.rows[0]
        conn.release()
        return user
    }
    catch (err) {
        throw new Error(`Could not add  movie with id ${l.movie_id} to user ${l.user_id}. Error: ${err}`)
    }
  }

  async update(l: List): Promise<List> {
    try {
        // @ts-ignore
        const conn = await Client.connect() 
        const sql ='Update user_list set user_id = $2, movie_id = $3 WHERE id =$1 RETURNING *'

        const result = await conn.query(sql, [l.id,l.user_id, l.movie_id])
        const user = result.rows[0]
        conn.release()
        return user
    }
    catch (err) {
        throw new Error(`Could not update new movie with id ${l.movie_id} to user ${l.user_id}. Error: ${err}`)
    }
  }

  async delete(id: string): Promise<List> {
    try {
        // @ts-ignore
        const conn = await Client.connect()
        const sql = 'DELETE FROM user_list WHERE id=($1)'
        const result = await conn.query(sql, [id])
        const user = result.rows[0]
        conn.release()
        return user
    } 
    catch (err) {
        throw new Error(`Could not delete watched entity with id= ${id}. Error: ${err}`)
    }
  }

}
