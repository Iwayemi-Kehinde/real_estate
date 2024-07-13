import { Request, Response, NextFunction } from "express"
import {Listing } from "../models/Listing.ts"

const create = async (req:Request, res: Response, next:NextFunction) => {
  try {
    const listing = await Listing.create(req.body)
    return res.status(201).json(listing);
  } catch (error) {
    next(error)
  }
}

export default create 