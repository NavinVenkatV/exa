import React from 'react'
import Nav from './nav'
import { VscTerminalUbuntu } from 'react-icons/vsc'
import { FaFileContract, FaUserSecret, FaLinkedin, FaXTwitter, FaCode } from 'react-icons/fa6';


function Footer() {
    return (
        <div>
            <div className='relative text-white border-1 overflow-hidden border-neutral-600 bg-black  mt-10 p-3 md:p-10  rounded-t-2xl w-[300px] md:w-[1500px] "}'>
                <img
                    src="/gradi.png"
                    alt="gradient"
                    className="absolute rounded-t-2xl inset-0 w-full h-full object-cover z-0 opacity-60"
                />
                <div className='flex justify-between z-50 relative'>
                    <div className='flex gap-2'>
                        <div className='flex flex-col justify-center'><VscTerminalUbuntu size={50} /></div>
                        <p className='flex flex-col justify-center text-3xl'>Exa</p>
                        <a className='md:flex items-center mt-3 text-sm p-1 rounded-full text-white  cursor-pointer'>Powered By <span className='font-bold pl-1'>exa.ai</span></a>
                    </div>
                    <div className='hidden md:flex gap-1 items-center text-white font-bold'>
                        <div>Current Status</div>
                        <div className='flex items-center mt-1'>
                            <span className='w-2 h-2  bg-green-600 rounded-full'></span>
                        </div>
                    </div>
                </div>
                <p className="h-0.5 my-7 bg-neutral-800 w-full"></p>

                <div className="md:flex justify-between z-50 relative items-center text-neutral-300 text-sm py-4 px-1 md:px-6 ">
                    <div className="md:flex gap-4">
                        <a href="/terms" className="flex mt-2 items-center gap-1 hover:text-white transition-all duration-200 ease-in-out ">
                            Terms Of Services
                        </a>
                        <a href="/privacy" className="flex mt-2 items-center gap-1 hover:text-white transition-all duration-200 ease-in-out ">
                            Privacy
                        </a>
                    </div>
                    <div className="md:flex gap-4 mt-5 md:mt-0">
                        <a href="https://www.linkedin.com" target="_blank" className="flex mt-2 items-center gap-1 hover:text-white transition-all duration-200 ease-in-out ">
                            <FaLinkedin /> LinkedIn
                        </a>
                        <a href="https://x.com" target="_blank" className="flex mt-2 items-center gap-1 hover:text-white transition-all duration-200 ease-in-out ">
                            <FaXTwitter />
                        </a>
                        <a href="/developer" className="flex items-center gap-1 mt-2 hover:text-white transition-all duration-200 ease-in-out ">
                            <FaCode /> Developer
                        </a>
                    </div>
                </div>

                <div className="text-center px-1 relative z-50 text-sm text-neutral-400 py-1">
                    © 2025 · All rights reserved · <span className="font-semibold text-white">Exa</span>
                </div>

            </div>
        </div>
    )
}

export default Footer
