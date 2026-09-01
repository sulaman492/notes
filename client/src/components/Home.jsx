import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { instance } from '../api/api'

const Home = () => {

    const [note, setNote] = useState([])
    const [leftSideShowingAllNotes,setleftSideShowingAllNotes]=useState(true)
    
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

    const createNote = async () => {

    }

    const editNote = async () => {

    }

    const deleteNote = async () => {

    }

    return (
        <div className='w-screen h-screen border border-green-500'>
            <div className='w-full h-full flex'>
                {/* left side */}
                <div className='left border  border-blue-900 w-1/3 h-screen'>
                    <button >
                        create note
                    </button>
                </div>
                {/* right side */}
                <div className='right w-full h-screen border  border-red-900'>
                    {
                        note.map((note) => {
                            return <div key={note._id} className='flex flex-col'>
                                <h3>{note.title}</h3>
                                <p>{note.content}</p>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
