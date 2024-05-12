import express from "express";

import { appRouter } from './routes/route.js'
import { MongoClient } from "mongodb";

const app = express()

app.use(express.json())

app.use('/api/v1', appRouter)


MongoClient.connect("mongodb://localhost:27017")
    .then(() => { console.log("connected to mongoDB") })
    .catch((err) => console.log(err))


app.listen(8000, 'localhost', () => console.log("Listening to port 8000"))