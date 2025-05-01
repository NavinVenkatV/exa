import React from 'react'
import { Great_Vibes } from 'next/font/google'
import PriceBox from './priceBox'

const great = Great_Vibes({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
})

const item1 = ['10 AI Potraits', 'Basic Styles', '24h Support', 'Basic Export']
const item2 = [
  '100 AI Portraits',
  'Premium Styles',
  'Priority Support',
  'HD Export',
  'Advanced Editing',
]
const item3 = [
  'Unlimited Portraits',
  'Custom Styles',
  'Dedicated Support',
  'API Access',
  'Custom Integration',
]

function Pricing() {
  return (
    <div className="relative rounded-2xl w-full max-w-[1400px] mx-auto text-white py-10 overflow-hidden">

      <div className="relative z-10">
        <div className="flex justify-center items-center text-center">
          <div>
            <div className="text-xl md:text-5xl ">
            Simple plans. No hidden fees.
            </div>
            <p className="mt-3 text-sm md:text-md text-neutral-500">
              Choose the perfect plan for your needs. No hidden fees.
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="flex flex-col md:flex-row gap-12 px-7 mt-10">
            <PriceBox title1="Basic" title2="The key features to unlocking your creativity and bringing your vision to life." context={item1} price="Free"/>
            <PriceBox title1="Premium" title2="Built to scale. The perfect plan for ambitious businesses on the rise." context={item2} price="$10"/>
            <PriceBox title1="Enterprise" title2="Dedicated support and infrastructure for your company and unlimited stock content." context={item3} price="$19"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pricing
