import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model.ts";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.ts";
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, email, confirmPassword } = req.body;

      // Validate required fields
      if (!username || !password || !email || !confirmPassword) {
        return next(errorHandler(400, "Please fill all fields"));
      }
  
      // Check if the username or email already exists
      const userExists = await User.findOne({ username });
      if (userExists) {
        return next(errorHandler(400, "User already exists"));
      }
  
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return next(errorHandler(400, "Email already exists"));
      }
  
      // Validate password length
      if (password.length < 6) {
        return next(errorHandler(400, "Password must contain a minimum of 6 characters"));
      }
  
      // Validate password and confirm password match
      if (password !== confirmPassword) {
        return next(errorHandler(400, "Passwords must match"));
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        username,
        password: hashedPassword,
        email,
      };
  
      // Create the user
      const user = await User.create(newUser);
      res.status(201).json({ message: "User created successfully" });
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
      return next(errorHandler(404, "Email does not exist"));
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return next(errorHandler(401, "Incorrect password"));
    }
    const token = jwt.sign({ id: user._id }, "wdsjbyug37t723GAW7ED352R9038GYhugy")
    const {password: pass, ...rest} = user.toObject()
    res.cookie("access_token", token, {httpOnly: true}).status(200).json(rest)
  } catch (error) {
    next(error);
  }
};
