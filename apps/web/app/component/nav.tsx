import React from 'react'
import { VscTerminalUbuntu } from 'react-icons/vsc'
import Button from './ui/Button'


function Nav() {
    return (
        <nav className='flex justify-between bg-gradient-to-r from-black to-neutral-800 p-2 rounded-xl'>
            <div className='flex gap-2'>
                <div className='flex gap-3'>
                    <div className='flex flex-col justify-center'><VscTerminalUbuntu size={40} /></div>
                    <p className='flex flex-col justify-center text-3xl'>Exa</p>
                    <a className='flex items-center text-sm p-1 mt-1 rounded-full text-white  cursor-pointer'>Powered By <span className='font-bold pl-1'>exa.ai</span></a>
                </div>
                <div className='pl-5 flex items-center justify-center gap-6'>
                    <p>Why Exa</p>
                    <p>Pricing</p>
                </div>
            </div>
            <button className='flex items-center bg-white p-2 rounded-full text-black cursor-pointer
            hover:-translate-y-0.5 transition-all duration-200 ease-in-out
            '>
                SignIn/SignUp
            </button>
        </nav>
    )
}

export default Nav
