import express from "express"
import { test } from "../controller/user.controller.ts"
import { updateUserInfo } from "../controller/user.controller.ts"
import {deleteUser} from "../controller/user.controller.ts"
import { verifyToken } from "../utils/verifyUser.ts"

const router = express.Router()

router.get("/", test)
router.post("/update/:id", verifyToken, updateUserInfo)
//can i use .post to update and create why not put
router.delete("/delete/:id", verifyToken, deleteUser)

export { router as userRouter}

