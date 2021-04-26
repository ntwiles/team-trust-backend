/* eslint-disable @typescript-eslint/unbound-method, @typescript-eslint/no-misused-promises */
import express, { NextFunction, Request, Response } from 'express'
import { InterestsController } from './controllers/interests'
import { LocationsController } from './controllers/locations'
import { MessagesController } from './controllers/messages'
import { UsersController } from './controllers/users'
import { init } from './middleware/init'
import { HttpError } from './types/error'
import cors from 'cors'

const app = express()
const port = 5000

app.use(express.json())
app.use(cors())
app.use(init)

app.get('/user/:userId', UsersController.show)
app.get('/users/:location/:interest', UsersController.index)
app.patch('/user/:userId', UsersController.update)

app.get('/messages/:location/:interest', MessagesController.index)
app.post('/messages/:location/:interest', MessagesController.create)

app.get('/locations', LocationsController.index)
app.get('/interests', InterestsController.index)

app.use((err: HttpError, req: Request, res: Response, _: NextFunction) => {
    console.log(err.message)
    res.status(err.status).send()
})

app.listen(port, () => console.log('Listening @ http://localhost:5000'))


