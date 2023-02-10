import express, { Request, Response } from 'express'
import { List, userList } from '../models/lists'

const store = new userList()

const index = async (_req: Request, res: Response) => {
  const movies = await store.index()
  res.json(movies)
}

const show = async (req: Request, res: Response) => {
   const movie = await store.show(req.params.id)
   res.json(movie)
}

const MovieRoutes = (app: express.Application) => {
  app.get('/userlist', index)
  app.get('/userlist/:id', show)
}

export default MovieRoutes 