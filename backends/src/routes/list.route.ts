import express from "express"
import create from "../controller/listing.controller.ts"
import {verifyToken} from "../utils/verifyUser.ts"

const router = express.Router()


router.post("/create", verifyToken, create)


export { router as listRouter }

//what is the big diffrence between exportr default and export