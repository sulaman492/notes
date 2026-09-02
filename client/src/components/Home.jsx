import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { instance } from '../api/api'

const Home = () => {

    const [note, setNote] = useState([])
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [rightSideShowingAllNotes, setRightSideShowingAllNotes] = useState(true)

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
        else{
            setRightSideShowingAllNotes(true)
        }
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleContentChange = (e) => {
        setContent(e.target.value)
    }

    const handleNoteSubmit=async (e)=>{
        e.preventDefault()
        try {
            const response=await instance.post("/createNote",{
                title:title,
                content:content
            })
            console.log(response.data);
            
        } catch (error) {
            console.log("error while create note",error);
        }
        getAllNote()
        handleCreateButton()
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
                {rightSideShowingAllNotes ? <div className='right w-full h-screen border  border-red-900'>
                    {
                        note.map((note) => {
                            return <div key={note._id} className='flex flex-col'>
                                <h3>{note.title}</h3>
                                <p>{note.content}</p>
                            </div>
                        })
                    }
                </div> :
                    <div>
                        <form onSubmit={handleNoteSubmit}>
                            <input className='border border-amber-400' value={title} onChange={handleTitleChange} />

                            <textarea className="border border-amber-400" value={content} onChange={handleContentChange} >
                                
                            </textarea>
                        <button type='submit'>save</button>
                        <button onClick={handleCreateButton}>cancel</button>
                        </form>
                    </div>
                }
            </div>
        </div>
    )
}

export default Home
