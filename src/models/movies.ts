// @ts-ignore
import Client from '../database'
// id - name- release date
export type Movie = {
    id?: number;
    name: string;
    release_date: string;
}

export class MovieStore {
    async index(): Promise<Movie[]> {
    try {
        // @ts-ignore
        const conn = await Client.connect()
        const sql = 'SELECT * FROM movies'
        const result = await conn.query(sql)
        conn.release()
        return result.rows 
    } 
    catch (err) {
        throw new Error(`Could not get movies. Error: ${err}`)
    }
  }

  
  async show(id: string): Promise<Movie> {
    try {
        // @ts-ignore
        const conn = await Client.connect()
        const sql = 'SELECT * FROM movies WHERE id=($1)'
        const result = await conn.query(sql, [id])
        conn.release()
        if(result.rows[0] ==undefined){
            throw new Error(`Could not find movie ${id} in empty table`)
        }
        else{
        return result.rows[0]
        }
    } 
    catch (err) {
        throw new Error(`Could not find movie ${id}. Error: ${err}`)
    }
  }
 
  
  async create(m: Movie): Promise<Movie> {
    try {
        // @ts-ignore
        const conn = await Client.connect()  
        const sql = 'INSERT INTO movies ( name, release_date) VALUES($1, $2) RETURNING *'
        const result = await conn.query(sql, [m.name, m.release_date])
        const movie = result.rows[0]
        conn.release()
        return movie
    }
    catch (err) {
        throw new Error(`Could not add new movie ${m.name}. Error: ${err}`)
    }
  }

  async update(m: Movie): Promise<Movie> {
    try {
        // @ts-ignore
        const conn = await Client.connect() 
        const sql ='Update movies set name = $2, release_date = $3 where id =$1  RETURNING *'
        const result = await conn.query(sql, [m.id, m.name, m.release_date])
        const movie = result.rows[0]
        conn.release()
        return movie
    }
    catch (err) {
        throw new Error(`Could not update new movie ${m.name}. Error: ${err}`)
    }
  }

  async delete(id: string): Promise<Movie> {
    try {
        // @ts-ignore
        const conn = await Client.connect()
        const sql = 'DELETE FROM movies WHERE id=($1) RETURNING *'
        const result = await conn.query(sql, [id])
        const movie = result.rows[0]
        conn.release()
        return movie
    } 
    catch (err) {
        throw new Error(`Could not delete movie ${id}. Error: ${err}`)
    }
  }
}
