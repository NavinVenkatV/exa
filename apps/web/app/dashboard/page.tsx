"use client"
import React from 'react'
import { useState, useEffect } from "react"
import { Space_Grotesk } from 'next/font/google'
import Nav from '../component/nav'
import { FaSearch } from "react-icons/fa";
import { GiWorld } from "react-icons/gi";
import { GrMagic } from "react-icons/gr";
import { FaArrowUp } from "react-icons/fa6";



const spaceGrotesk = Space_Grotesk({
    subsets: ['latin']
})

function page() {
    const [greeting, setGreeting] = useState<String>("");
    const [query, setQuery] = useState<String[]>([""]);
    const [input, setInput] = useState("");
    const [showChatUi, setChatUi] = useState<Boolean>(false);

    useEffect(() => {
        const now = new Date();
        const hours = now.getHours();
        if (hours >= 0 && hours < 12) {
            setGreeting("Good morning")
        } else if (hours >= 12 && hours < 17) {
            setGreeting("Good afterNoon")
        } else if (hours >= 17 && hours < 21) {
            setGreeting("Good evening")
        } else {
            setGreeting("Good night")
        }
    }, [])

    return (
        <div className={`w-full  px-10 py-5 overflow-hidden min-h-screen bg-gradient-to-b from-blue-950 via-black to-black text-white ${spaceGrotesk.className}`}>
            <Nav />
            <div className='flex justify-center w-full h-full'>
                <div className={`flex flex-col items-center justify-start mt-24 h-full w-full`}>
                    <div className='flex justify-between h-full flex-col'>
                        <div className='text-center'>
                            {query.map((q, i) => (
                                <div key={i}>
                                    {!showChatUi && <h1 className='text-5xl'>{greeting}, Navin</h1>}
                                    {!showChatUi && <p className='text-2xl text-neutral-500'>How can I help you today?</p>}
                                    {showChatUi && (
                                        <div className='w-[800px] mb-44 text-start overflow-y-auto h-auto bg-black text-white'>
                                            <p className='text-2xl'>{query}</p>
                                            <p className="h-0.5 my-7 bg-neutral-800 w-full"></p>
                                            <div>
                                                exa  llm answer
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className='flex flex-col justify-center items-center'>
                            <div className='border-1 w-[700px] pb-10 pt-4 focus:outline-none mt-7 px-4 border-neutral-700 rounded-xl'>
                                <div className='flex gap-2'>
                                    <input
                                        onChange={(e) => {
                                            setInput(e.target.value)
                                        }}
                                        type="text" placeholder='What do you want to know?' className='focus:outline-none w-full h-full' />
                                    <span
                                        onClick={() => {
                                            setQuery(prev => [...prev, input])
                                            setInput("")
                                            setChatUi(true)
                                        }}
                                        className={`w-7 h-7 rounded-full flex justify-center ${input != "" && "bg-white cursor-pointer hover:-translate-y-0.5 transition-all duration-200 ease-in-out"} cursor-pointer items-center bg-neutral-800`}><FaArrowUp color='black' /></span>
                                </div>
                            </div>

                            <div className="mt-5 text-black text-center items-center justify-center flex flex-wrap gap-4">
                                <div className="bg-white flex items-center gap-2 p-3 rounded-xl cursor-pointer hover:bg-neutral-200 transition-all duration-150 ease-in-out">
                                    <FaSearch />
                                    <span>Research</span>
                                </div>
                                <div className="bg-white flex items-center gap-2 p-3 rounded-xl cursor-pointer hover:bg-neutral-200 transition-all duration-150 ease-in-out">
                                    <GiWorld />
                                    <span>Get latest news around world</span>
                                </div>
                                <div className="bg-white flex items-center gap-2 p-3 rounded-xl cursor-pointer hover:bg-neutral-200 transition-all duration-150 ease-in-out">
                                    <GrMagic />
                                    <span>Edit Image</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default page
