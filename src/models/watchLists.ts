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
            return `Could not find id ${id} in empty table`
        }
        else{
        return result.rows[0]
        }
    } 
    catch (err) {
        throw new Error(`Could not find id=${id}. Error: ${err}`)
    }
  }
}
