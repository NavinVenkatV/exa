"use client"
import React, { ReactNode, useState } from 'react'
import { FaGoogle, FaGithub } from "react-icons/fa";
import { signIn } from 'next-auth/react';
import { motion } from "framer-motion";
import Spin from './ui/spinner';

function Login({ setLogin }: { setLogin: any }) {
    const [googleLoading, setGoogleLoading] = useState<ReactNode>("Google")
    const [gitLoading, setGithubLoading] = useState<ReactNode>("GitHub")

    const handleGoogleSignIn = async () => {
        setGoogleLoading(<Spin/>)
        const res = await signIn("google", { redirect: false })
        if (res?.error) {
            setGoogleLoading('Google')
            console.error("Google login failed:", res.error)
        }
    }

    const handleGitHubSignIn = async () => {
        setGithubLoading(<Spin/>)
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className='bg-neutral-800 rounded-2xl w-[600px] h-[400px] text-white flex justify-center'>
            <div className='flex flex-col justify-center'>
                <div className='text-center'>
                    <div className='text-4xl'>Welcome Back!</div>
                    <p className='text-sm mt-2 font-bold'>Log In to continue your journey</p>

                    <button
                        className='text-xl hover:bg-neutral-400 transition-all duration-200 
                        ease-in-out cursor-pointer gap-2 items-center bg-white text-center
                        text-black mt-5 mr-3 w-full p-2 rounded-xl flex justify-center'
                        onClick={handleGoogleSignIn}
                    >
                        <FaGoogle /> {googleLoading}
                    </button>

                    <button
                        className='text-xl hover:bg-neutral-400 transition-all duration-200 
                        ease-in-out cursor-pointer gap-2 items-center bg-white text-center
                        text-black mt-5 w-full p-2 rounded-xl flex justify-center'
                        onClick={handleGitHubSignIn}
                    >
                        <FaGithub /> {gitLoading}
                    </button>

                    <p
                        onClick={() => { setLogin(false) }}
                        className='mt-7 hover:font-bold hover:text-white text-neutral-400
                        transition-all duration-300 ease-in-out cursor-pointer'>close</p>
                </div>
            </div>
        </motion.div>
    )
}

export default Login
