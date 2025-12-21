import React, { useState } from 'react'
import Sidebar from '../../components/SIDEBAR'
import Navbar from '../../components/NAVBAR'
import CardPofil from '../../components/CardProfil'

export default function AKUNKEPSEK() {
        const [isModalOpen, setIsModalOpen] = useState(false);
    
  return (
    <div className='bg-[#F5F7FA] min-h-screen'>
      <Sidebar />
      <div className='flex flex-col md:ml-64 transition-all duration-300'>
        <Navbar/>
        <div className='flex justify-between pl-6 pr-6 max-md:flex-col max-md:gap-3 pt-3'>
          <div className=''>
            <h1 className='text-[16px] text-[#343C6A] font-semibold'>Daftar Akun</h1>
            <p className='text-[16px] text-[#718EBF] max-md:hidden'>Akun wali kelas beserta daftar siswa-siswinya  </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className='rounded-2xl text-[16px] bg-[#1814F3] text-white py-2 px-6 font-medium hover:bg-blue-800'
          >
            + Tambah Akun
          </button>
        </div>
        <div>
            
        </div>

      </div>

      
    </div>
  )
}
