import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { instance } from '../api/api'

const Home = () => {

    const [note, setNote] = useState([])
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [rightSideShowingAllNotes, setRightSideShowingAllNotes] = useState(true)
    const [editNote, setEditNote] = useState(false)
    const [id, setId] = useState("")

    useEffect(() => { getAllNote() }, [])

    const getAllNote = async () => {
        try {
            const response = await instance.get("/getAllNotes")
            setNote(response.data.notes)
            console.log(response.data.notes)
        } catch (error) {
            console.log("error gettig all notes ", error);
        }
    }

    const handleCreateButton = () => {
        if (rightSideShowingAllNotes) {
            setRightSideShowingAllNotes(false)
        }
        else {
            setRightSideShowingAllNotes(true)
        }
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleContentChange = (e) => {
        setContent(e.target.value)
    }

    const handleNoteSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await instance.post("/createNote", {
                title: title,
                content: content
            })
            console.log(response.data);

        } catch (error) {
            console.log("error while create note", error);
        }
        getAllNote()
        handleCreateButton()
    }

    const handleDeleteNote=async (id) => {
        try {
            const response=await instance.delete(`/deleteNote/${id}`)
            console.log(response.data);
        } catch (error) {
            console.log("error deleting note ",error)
        }
        getAllNote()
    }

    const handleEditNote=async (id,title,content) => {
        setEditNote(true)
        setRightSideShowingAllNotes(false)
        setTitle(title)
        setContent(content)
        setId(id)
    }

    const handleEditFormSubmit=async (e) => {
        e.preventDefault()
        alert("hello")
        try {
            const response=await instance.put(`/editNote/${id}`,{
                title:title,
                content:content
            })
        } catch (error) {
            console.log("error while editing the note ",error);
        }
        getAllNote()
        handleCancelButton()
    }
    const handleCancelButton=async () => {
        setEditNote(false)
        setRightSideShowingAllNotes(true)
    }

    return (
        <div className='w-screen h-screen border border-green-500'>
            <div className='w-full h-full flex'>
                {/* left side */}
                <div className='left border  border-blue-900 w-1/3 h-screen'>
                    <button onClick={handleCreateButton}>
                        create note
                    </button>
                </div>
                {/* right side */}
                {rightSideShowingAllNotes ? <div className='right w-full h-screen border  border-red-900 flex gap-2'>
                    {
                        note.map((note) => {
                            return <div key={note._id} className='flex flex-col '>
                                <h3>{note.title}</h3>
                                <p>{note.content}</p>
                                <div className='flex gap-2 m-2'>
                                    <button className='cursor-pointer bg-green-400 rounded-md p-1 font-semi-bold' onClick={()=>(handleEditNote(note._id,note.title,note.content))}>edit</button>
                                    <button className='cursor-pointer bg-red-400 rounded-md p-1 font-semi-bold' onClick={()=>(handleDeleteNote(note._id))}>delete</button>
                                </div>
                            </div>
                        })
                    }
                </div> :editNote? <div>
                    <form onSubmit={handleEditFormSubmit}>
                        <input className='border border-amber-400' type="text" value={title} onChange={handleTitleChange}/>
                        <textarea className="border border-amber-400" value={content} onChange={handleContentChange} >
                        </textarea>
                        <button type="button" onClick={handleCancelButton}>cancel</button>
                        <button type='submit'>save</button>
                    </form>
                </div>:
                    <div>
                        <form onSubmit={handleNoteSubmit}>
                            <input className='border border-amber-400' value={title} onChange={handleTitleChange} />

                            <textarea className="border border-amber-400" value={content} onChange={handleContentChange} >

                            </textarea>
                            <button type='submit'>save</button>
                            <button type='button' onClick={handleCreateButton}>cancel</button>
                        </form>
                    </div>
                }
            </div>
        </div>
    )
}

export default Home
