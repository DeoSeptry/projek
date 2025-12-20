import React from 'react'
import Logo from '../assets/icon-saldo.png'

export default function NAVBAR() {
  return (
    <div className='bg-white h-16 flex items-center justify-between '>
      <p className='text-[28px] text-[#343C6A] font-semibold pl-6'>HomePage</p>
      <div className='rounded-full pr-6'>
        <img src={Logo} alt="" />
      </div>
    </div>
  )
}
