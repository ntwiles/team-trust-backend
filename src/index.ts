import express from 'express'
import { MessagesController } from './controllers/messages'
import { UsersController } from './controllers/users'
import { locations } from './types/location'
import { interests } from './types/interest'
import { MessageModel } from './dal/messages'
import { UserModel } from './dal/users'

const app = express()
const port = 3000

;(async () => await Promise.all([MessageModel.init(), UserModel.init()]))()

app.use(express.json())

app.get('/user/:userId', UsersController.show)
app.get('/users/:location/:interest', UsersController.index)

app.get('/messages/:location/:interest', MessagesController.index)
app.post('/messages/:location/:interest', MessagesController.create)

app.get('/locations', (_, res) => res.send(locations))
app.get('/interests', (_, res) => res.send(interests))

app.listen(port, () => console.log('Listening @ http://localhost:3000'))
