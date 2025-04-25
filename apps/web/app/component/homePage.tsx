"use client"
import React from 'react'
import { Space_Grotesk } from 'next/font/google'
import Button from './ui/Button'
import Nav from './nav'
import Image from './image'
import Hori from './hori'
import Pricing from './pricing'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin']
})

function HomePage() {
  return (
    <div className={`w-full h-auto px-10 py-5 overflow-hidden text-white ${spaceGrotesk.className}`}>
      <Nav />
      <div className='flex  items-center justify-center'>
        <div className='flex flex-col justify-start mt-32 items-center text-center'>
          <h1 className='text-7xl font-bold max-w-[800px]'>
            Chat with the internet, not just search it
          </h1>
          <p className='mt-3 max-w-[600px] text-neutral-500'>
            Meet Exa, your intelligent research assistant that turns complex prompts into powerful insights—instantly.
          </p>
          <div className='mt-10'>
            <Button title='Get Started' place="dashboard"/>
          </div>
          <div className='mt-12'>
          <Hori/>
          </div>
          <div className='flex bg-black justify-center mt-14'>
            <Image/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
