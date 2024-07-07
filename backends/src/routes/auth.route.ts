import express from "express"
import {signup} from "../controller/auth.controller.ts"

const router = express.Router()

router.post("/signup", signup)

export {router as authRouter}