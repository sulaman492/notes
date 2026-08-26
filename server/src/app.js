import express from "express"
import { connectDB } from "./utils/db.js"

const app=express()
connectDB()

app.get("/",(req,res)=>{
    res.send("hello world")
})

export default app