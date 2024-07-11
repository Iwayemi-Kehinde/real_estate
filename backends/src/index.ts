import express from "express"
import { Request, Response, NextFunction } from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./db/db"
import cors from "cors"
import cookieParser from "cookie-parser" 
import { userRouter } from "./routes/user.route"
import { authRouter } from "./routes/auth.route"

const PORT = process.env.PORT || 5000

//initialize express
const app = express()


//connect to mongodb
connectDB()

//middlewares
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.method, req.originalUrl)
  next()
})
app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});
  
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({message: "successfull route!!"})
})

app.listen(PORT, () => {
  console.log("Server listening on port: " + PORT)
})