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
    const { username, password, email, confirmPassword } = req.body;

    if (!username || !password || !email || !confirmPassword) {
      return next(errorHandler(400, "Please fill all fields"))
    }
    if (password && password.length < 6) {
      return next(errorHandler(400, "Password must contain a minimum of 6 character"))
    }
    if (password !== confirmPassword) {
      return next(errorHandler(400, "Password must be same"))
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      username,
      password: hashedPassword,
      email,
    };
    const user = await User.create(newUser);
    res.status(201).json({message: "User created successfully"});
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
      return next(errorHandler(401, "wrong password"));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    const {password: pass, ...rest} = user
    res.cookie("access_token", token, {httpOnly: true}).status(200).json(rest)
  } catch (error) {
    next(error);
  }
};
