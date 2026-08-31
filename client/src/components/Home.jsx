import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { instance } from '../api/api'

const Home = () => {
    
    const [note, setNote] = useState([])
    
    useEffect(()=>{getAllNote},[note])

    const getAllNote=async () => {
        const response=await instance.get("/getAllNotes")
        setNote(response.data)    
    }

    const createNote=async () => {
        
    }

    const editNote=async () => {
        
    }

    const deleteNote=async () => {
        
    }
  
    return (
    <div>
        
    </div>
  )
}

export default Home
