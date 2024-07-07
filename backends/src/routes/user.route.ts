import express from "express"
import {test} from "../controller/user.controller.ts"

const router = express.Router()

router.get("/", test)

export { router as userRouter}

