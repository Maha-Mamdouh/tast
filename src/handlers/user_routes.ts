import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/users'

const store = new UserStore()

const index = async (_req: Request, res: Response) => {
  const users = await store.index()
  res.json(users)
}

const show = async (req: Request, res: Response) => {
   const user = await store.show(req.params.id)
   res.json(user)
}

const create = async (req: Request, res: Response) => {
    try {
        //p.first_name, p.last_name, p.balance,p.email,p.password
        const user: User = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            balance: req.body.balance,
            email: req.body.email,
            password:req.body.password
        }

        const newUser = await store.create(user)
        res.json(newUser)
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
        //p.first_name, p.last_name, p.balance,p.email,p.password
        console.log('here')
        const user: User = {
            id: (req.params.id as unknown) as number,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            balance: req.body.balance,
            email: req.body.email,
            password:req.body.password
        }
        console.log(user)
        const updateUser = await store.update(user)
        res.json(updateUser)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}


const UserRoutes = (app: express.Application) => {
  app.get('/users', index)
  app.get('/users/:id', show)
  app.post('/users', create)
  app.delete('/users/:id', destroy)
  app.patch('/users/:id', update)
}

export default UserRoutes 