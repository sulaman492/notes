import { createNote,editNote,deleteNote,getAllNote } from "../controllers/note.controller.js";
import express from "express"

const router=express.Router()

router.get("/getAllNotes",getAllNote)

router.post("/createNote",createNote)

router.put("/editNote",editNote)

router.delete("/deleteNote",deleteNote)

export default router