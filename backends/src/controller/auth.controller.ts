import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model.ts";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.ts";
import jwt from "jsonwebtoken"

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
    res.status(201).json({ message: "user created successfully" });
  } catch (error: any) {
    next(error);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "Invalid credentials"));
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return next(errorHandler(401, "wrong credentials"));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    const {password: pass, ...rest} = user
    res.cookie("access_token", token, {httpOnly: true}).status(200).json(rest)
  } catch (error) {
    next(error);
  }
};
