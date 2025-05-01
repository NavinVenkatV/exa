"use client"
import React, { useState } from 'react'
import { Space_Grotesk } from 'next/font/google'
import Button from './ui/Button'
import Nav from './nav'
import Image from './image'
import Hori from './hori'
import Login from './login'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin']
})

function HomePage() {
  const [login, setLogin] = useState(false)
  return (
    <div className={`w-full h-auto relative z-0 pt-28 overflow-hidden text-white ${spaceGrotesk.className}`}>
      <Nav setLogin={setLogin} />
      {login && (
        <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-opacity-50">
          <Login setLogin={setLogin} />
        </div>
      )}
      <div className='flex  items-center justify-center'>
        <div className='flex flex-col justify-start mt-20 md:mt-32 items-center text-center'>
          <h1 className='md:text-7xl text-2xl font-bold w-[300px] md:w-[800px]'>
            Chat with the internet, not just search it
          </h1>
          <p className='mt-3 w-[200px] md:w-[600px] text-neutral-500'>
            Meet Exa, your intelligent research assistant 
          </p>
          <div className='mt-10'>
            <Button title='Get Started' place="dashboard" />
          </div>
          <div className='mt-12'>
            <Hori />
          </div>
          {/* <div className='flex bg-black px-7 items-center justify-center mt-14'>
            <Image />
          </div> */}
          <div className='mt-10'>
            <p className='text-xl md:text-2xl'>Basic Illustration of exa</p>
            <img src="/image.png" alt="" className='w-[300px] md:w-[1200px] h-[200px] object-cover md:h-[600px]
             rounded-2xl mt-7 border-1 border-l-green-900 border-t-red-700 border-r-pink-700 border-b-yellow-700' />
            </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
