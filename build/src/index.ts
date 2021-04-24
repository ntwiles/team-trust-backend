import * as express from 'express'
import 'dotenv/config'
import { MessagesController } from './lib/controllers/messages'
import { UsersController } from './lib/controllers/users'
import { locations } from './types/location'
import { interests } from './types/interest'

const app = express()
const port = 3000

app.get('/', (_, res) => res.send('Hello world!'))

app.get('/user/:userId', UsersController.show)
app.get('/users/:location/:interest', UsersController.index)
app.get('/messages/:location/:interest', MessagesController.index)
app.get('/locations', (_, res) => res.send(locations))
app.get('/interests', (_, res) => res.send(interests))

app.listen(port, () => console.log('Listening @ http://localhost:3000'))
