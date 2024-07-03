import React from 'react'
import ConfigSection from './ConfigSection'

export default function SidebarContent() {
  return (
    <div className='grid grid-rows-12 w-full h-full p-2'>
        <div className='row-span-2'></div>
        <div className='row-span-10 bg-gray-100 rounded-xl p-2'>
          <div className='w-full h-full border border-gray-300 rounded-lg'>
            <ConfigSection/>
          </div>
        </div>
    </div>
  )
}
