import express from "express"
import { connectDB } from "./utils/db.js"
import NotesRoute from "./routes/note.route.js"
import cors from "cors"

const app=express()
connectDB()

const corsOption={
    origin:"http://localhost:5173",
    optionsSuccessStatus:200,
};

app.use(cors(corsOption))

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hello world")
})

app.use("/api",NotesRoute)

export default app