import express, { NextFunction, Request, Response } from 'express'
import { InterestsController } from './controllers/interests'
import { LocationsController } from './controllers/locations'
import { MessagesController } from './controllers/messages'
import { UsersController } from './controllers/users'
import { init } from './middleware/init'
import { HttpError } from './types/error'

const app = express()
const port = 3000

app.use(express.json())
app.use(init)

app.get('/user/:userId', UsersController.show)
app.get('/users/:location/:interest', UsersController.index)
app.patch('/user/:userId', UsersController.update)

app.get('/messages/:location/:interest', MessagesController.index)
app.post('/messages/:location/:interest', MessagesController.create)

app.get('/locations', LocationsController.index)
app.get('/interests', InterestsController.index)

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    res.status(err.status).send(err.message)
})


app.listen(port, () => console.log('Listening @ http://localhost:3000'))


