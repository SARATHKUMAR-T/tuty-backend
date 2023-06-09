import express from "express"
import "dotenv/config"
import { dbConnection } from "./db.js"
import { userRouter } from "./Routes/userRouter.js"
import cors from "cors"

const app=express()

// middleware
app.use(express.json())
app.use(cors())


// database Connection
dbConnection()

// Api's
app.use('/tuty',userRouter)


// listening to the port
app.listen(process.env.PORT,()=>console.log('server is started'))