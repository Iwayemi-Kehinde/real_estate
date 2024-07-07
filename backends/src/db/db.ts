import mongoose from "mongoose"

const connectDB = async () => { 
  try {
     const connect = await mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.4")
    console.log("Mongo db connected to: " + connect.connection.host)
  } catch(error: any) {
    console.log(error.message)
  }
} 

export default connectDB