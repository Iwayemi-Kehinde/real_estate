import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"
import { errorHandler } from "./error"
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token
  if (!token) {
    return next(errorHandler(401, "unauthorized"))
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(403, "Forbidden"))
    }
    req.user = user
    next()
  })
}