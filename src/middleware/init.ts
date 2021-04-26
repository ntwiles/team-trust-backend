import { NextFunction, Request, Response } from "express"
import { InterestModel } from "../dal/interests"
import { LocationModel } from "../dal/locations"
import { MessageModel } from "../dal/messages"
import { UserModel } from "../dal/users"

export const init = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await Promise.all([
        MessageModel.init('data/messages.json'),
        UserModel.init('data/users.json'),
        InterestModel.init('data/interests.json'),
        LocationModel.init('data/locations.json')
    ])

    next()
}