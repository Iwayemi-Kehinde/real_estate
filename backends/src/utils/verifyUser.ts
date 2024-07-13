import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"
import { errorHandler } from "./error"

//typescript cannot recongize the user property on the req object 
interface CustomRequest extends Request {
  user?: any;
}

const JWT_SECRET = process.env.JWT_SECRET || "wdsjbyug37t723GAW7ED352R9038GYhugy"
export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token
  if (!token) {
    return next(errorHandler(401, "unauthorized"))
  }

  jwt.verify(token,JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return next(errorHandler(403, "Forbidden"))
    }
    req.user = user
    next()
  })
}