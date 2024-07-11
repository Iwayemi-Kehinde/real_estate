import {Request, Response, NextFunction} from "express"
import { errorHandler } from "../utils/error"
import bcrypt from "bcrypt"
import { User } from "../models/user.model"
export const test = (req: Request, res: Response, next: NextFunction) => {
  res.send("hello")
}

export const updateUserInfo = async (req: Request, res:Response, next: NextFunction) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own update"))
  }
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10)
    }

    //why not bcrypt.compare || hash

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar
       }
    }, { new: true })
    const {password, ...rest} = updatedUser._doc
  } catch (error) {
    next(error)
  }
}


export const deleteUser = async(req: Request, res: Response, next: NextFunction) => {
  if(req.user.id !== req.params.id) return next(errorHandler(401, "You can only update your own account"))
  try {

  } catch (error) {

  }
}