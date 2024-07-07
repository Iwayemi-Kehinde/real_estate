import express from "express"
import { signup } from "../controller/auth.controller.ts"
import {signin} from "../controller/auth.controller.ts"

const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)

export {router as authRouter}