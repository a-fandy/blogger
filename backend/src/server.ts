import express from "express";
import { connectMongoDB } from "./express/mongo";
import dotenv from "dotenv";
import { jsonErrorHandler } from "./exceptions/errorHandler";
import { routes } from "./express/route";

const app = express()

dotenv.config();
app.use(express.json())
routes(app)

// Error handling middleware for JSON parsing errors
app.use(jsonErrorHandler)

const port: number = Number(process.env.PORT)
app.listen(port, 'localhost', () => {
    connectMongoDB()
    console.log("Listening to port", process.env.PORT)
})
