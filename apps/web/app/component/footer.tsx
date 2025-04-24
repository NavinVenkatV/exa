import React from 'react'
import Nav from './nav'
import { VscTerminalUbuntu } from 'react-icons/vsc'
import { FaFileContract, FaUserSecret, FaLinkedin, FaXTwitter, FaCode } from 'react-icons/fa6';


function Footer() {
    return (
        <div>
            <div className='text-white bg-black  mt-10 p-10 rounded-xl w-[1500px] "}'>
                <div className='flex justify-between '>
                    <div className='flex gap-2'>
                        <div className='flex flex-col justify-center'><VscTerminalUbuntu size={50} /></div>
                        <p className='flex items-center text-5xl'>Exa</p>
                        <a className='flex items-center mt-3 text-sm p-1 rounded-full text-white  cursor-pointer'>Powered By <span className='font-bold pl-1'>exa.ai</span></a>
                    </div>
                    <div className='flex gap-1 items-center text-neutral-500 font-bold'>
                        <div>Current Status</div>
                        <div className='flex items-center mt-1'>
                            <span className='w-2 h-2  bg-green-600 rounded-full'></span>
                        </div>
                    </div>
                </div>
                <p className="h-0.5 my-7 bg-neutral-900 w-full"></p>

                <div className="flex justify-between items-center text-neutral-500 text-sm py-4 px-6 ">
                    <div className="flex gap-4">
                        <a href="/terms" className="flex items-center gap-1 hover:text-white transition-all duration-200 ease-in-out ">
                             Terms Of Services
                        </a>
                        <a href="/privacy" className="flex items-center gap-1 hover:text-white transition-all duration-200 ease-in-out ">
                        Privacy
                        </a>
                    </div>
                    <div className="flex gap-4">
                        <a href="https://www.linkedin.com" target="_blank" className="flex items-center gap-1 hover:text-white transition-all duration-200 ease-in-out ">
                            <FaLinkedin /> LinkedIn
                        </a>
                        <a href="https://x.com" target="_blank" className="flex items-center gap-1 hover:text-white transition-all duration-200 ease-in-out ">
                            <FaXTwitter /> 
                        </a>
                        <a href="/developer" className="flex items-center gap-1 hover:text-white transition-all duration-200 ease-in-out ">
                            <FaCode /> Developer
                        </a>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Footer
