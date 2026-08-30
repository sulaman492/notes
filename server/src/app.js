import express from "express"
import { connectDB } from "./utils/db.js"
import NotesRoute from "./routes/note.route.js"

const app=express()
connectDB()

app.get("/",(req,res)=>{
    res.send("hello world")
})

app.use("/api",NotesRoute)

export default app