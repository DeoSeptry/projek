import React, { useState } from 'react'
import Sidebar from '../../components/SIDEBAR'
import Navbar from '../../components/NAVBAR'
import Arus from '../../components/ARUS-KEUANGAN'
import WithdrawalModal from '../../components/Modal1' // Pastikan file modal yang tadi sudah dibuat

export default function TRANSAKSI_WALMUR() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='bg-[#F5F7FA] min-h-screen'>
      <Sidebar />
      <div className='flex flex-col md:ml-64 transition-all duration-300'>
        <Navbar/>
        <h1 className='text-[22px] text-[#343C6A] font-medium pl-6 pt-3'>Arus Keuangan</h1>
        <div><Arus /></div>

        <div className='flex justify-between px-6 py-4 max-md:flex-col max-md:gap-2'>
          <div className='flex flex-col gap-1 '>
            <h1 className='text-[16px] text-[#343C6A] font-semibold'>avv</h1>
            <p className='text-[16px] text-[#718EBF] max-md:hidden'>Pantau transaksi tabungan dan tarik uang tabunganmu disini</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className='rounded-2xl text-[16px] bg-[#1814F3] text-white py-2 px-6 font-medium hover:bg-blue-800'
          >
            Tarik Tunai
          </button>
        </div>
      </div>

      <WithdrawalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}