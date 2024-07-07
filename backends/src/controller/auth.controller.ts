import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model.ts";
import bcrypt from "bcrypt";
import {errorHandler} from "../utils/error.ts"

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      username,
      password: hashedPassword,
      email,
    };
    const user = await User.create(newUser);
    res.status(201).send("user created successfully");
    console.log(user)
  } catch (error: any) {
    next(error)
  } 
};
