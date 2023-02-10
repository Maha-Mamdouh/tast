import express, { Request, Response } from 'express'
import { List, userList } from '../models/watchLists'

const lst = new userList()

const index = async (_req: Request, res: Response) => {
  const movies = await lst.index()
  res.json(movies)
}

const show = async (req: Request, res: Response) => {
   const movie = await lst.show(req.params.id)
   res.json(movie)
}

const create = async (req: Request, res: Response) => {
  try {
      const movie: List = {
        user_id: req.body.user_id,
        movie_id: req.body.movie_id
      }
      const newMovie = await lst.create(movie)
      res.json(newMovie)
  } catch(err) {
      res.status(400)
      res.json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  const deleted = await lst.delete(req.body.id)
  res.json(deleted)
}

const update = async (req: Request, res: Response) => {
  try {
      const movie: List = {
          id: (req.params.id as unknown) as number,
          user_id: req.body.user_id,
          movie_id: req.body.movie_id
      }
      const updateMovie = await lst.update(movie)
      res.json(updateMovie)
  } catch(err) {
      res.status(400)
      res.json(err)
  }
}
const listRoutes = (app: express.Application) => {
  app.get('/watchlist', index)
  app.get('/watchlist/:id', show)
  app.post('/watchlist', create)
  app.delete('/watchlist/:id', destroy)
  app.patch('/watchlist/:id', update)
}

export default listRoutes 