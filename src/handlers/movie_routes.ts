import express, { Request, Response } from 'express'
import { Movie, MovieStore } from '../models/movies'

const store = new MovieStore()

const index = async (_req: Request, res: Response) => {
  const movies = await store.index()
  res.json(movies)
}

const show = async (req: Request, res: Response) => {
   const movie = await store.show(req.params.id)
   res.json(movie)
}

const create = async (req: Request, res: Response) => {
    try {
        const movie: Movie = {
            name: req.body.name,
            release_date: req.body.release_date
        }
        const newMovie = await store.create(movie)
        res.json(newMovie)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const update = async (req: Request, res: Response) => {
    try {
        const movie: Movie = {
            id: (req.params.id as unknown) as number,
            name: req.body.name,
            release_date: req.body.release_date
        }
        const updateMovie = await store.update(movie)
        res.json(updateMovie)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}


const movieRoutes = (app: express.Application) => {
  app.get('/movies', index)
  app.get('/movies/:id', show)
  app.post('/movies', create)
  app.delete('/movies/:id', destroy)
  app.patch('/movies/:id', update)
}

export default movieRoutes 