import {Request, Response, NextFunction} from "express"
import { errorHandler } from "../utils/error"
import bcrypt from "bcrypt"
import { User } from "../models/user.model"
export const test = (req: Request, res: Response, next: NextFunction) => {
  res.send("hello")
}

interface CustomRequest extends Request{
  user?: any;
}

export const updateUserInfo = async (req: CustomRequest, res:Response, next: NextFunction) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own update"))
  }
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10)
    }




    
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar
       }
    }, { new: true })
    if (updatedUser) {
      const { password: string, ...rest } = updatedUser.toObject()
      res.json(rest)
    }
  } catch (error) {
    next(error)
  }
}


export const deleteUser = async(req: CustomRequest, res: Response, next: NextFunction) => {
  if(req.user.id !== req.params.id) return next(errorHandler(401, "You can only update your own account"))
  try {
    await User.findOneAndDelete(req.params.id)
    res.status(200).json("User has been deleted")
    res.clearCookie("access_token")
  } catch (error) {
    next(error)
  }
}