import { notesModel } from "../models/note.model";


export const createNote=async (req,res) => {
    try {
        const {title,content}=req.body
        const note=await notesModel.create({title,content})
        return res.status(201).json({success:true,message:"note created succesfully",note})
    } catch (error) {
        return res.status(500).json({success:false,message:"something went wrong"})
    }   
}

// export const editNote=async (req,res) => {
//     try {
//         const id=req.params.id
//         const {title,content}=req.body
//         const note=await notesModel.findOneAndUpdate({_id: id},{title:title,content:content},{new:true})
//         return res.status(200).json({success:true,message:"note updated succesfully",note})
//     } catch (error) {
//         return res.status(500).json({success:false,message:"something went wrong"})
//     }
// }

export const editNote=async (req,res) => {
    try {
        const id=req.params.id
        const {title,content}=req.body
        const note=await notesModel.findOne({_id: id})
        if(note){
            note.title=title
            note.content=content
            await note.save()
        }
        else{
            return res.status(404).json({success:false,message:"note not found"})    
        }
        return res.status(200).json({success:true,message:"note updated succesfully",note})
    } catch (error) {
        return res.status(500).json({success:false,message:"something went wrong"})
    }
}

export const deleteNote=async (req,res) => {
    try {
        const id=req.params.id
        const deletedNote=await notesModel.deleteOne({_id:id})
        if(deletedNote.deletedCount>0){
            return res.status(200).json({success:true,message:"note deleted succesfully"})
        }
        else{
            return res.status(404).json({success:false,message:"note not found"})        
        }
    } catch (error) {
        return res.status(500).json({success:false,message:"something went wrong"})
    }
}

export const getAllNote=async (req,res) => {
    try {
        const notes=await notesModel.find()
        return res.status(200).json({success:true,notes})
    } catch (error) {
        return res.status(500).json({success:false,message:"something went wrong"})    
    }    
}

