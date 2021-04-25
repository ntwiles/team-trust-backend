import express from 'express'
import { InterestsController } from './controllers/interests'
import { LocationsController } from './controllers/locations'
import { MessagesController } from './controllers/messages'
import { UsersController } from './controllers/users'
import { InterestModel } from './dal/interests'
import { LocationModel } from './dal/locations'
import { MessageModel } from './dal/messages'
import { UserModel } from './dal/users'

const app = express()
const port = 3000

    ; (async () => await Promise.all([MessageModel, UserModel, InterestModel, LocationModel].map(m => m.init())))()

app.use(express.json())

app.get('/user/:userId', UsersController.show)
app.get('/users/:location/:interest', UsersController.index)

app.get('/messages/:location/:interest', MessagesController.index)
app.post('/messages/:location/:interest', MessagesController.create)

app.get('/locations', LocationsController.index)
app.get('/interests', InterestsController.index)

app.use((err: any, req: any, res: any, next: any) => {
    console.log(err)
})

app.listen(port, () => console.log('Listening @ http://localhost:3000'))
