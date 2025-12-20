import React from 'react'
import Sidebar from '../../components/SIDEBAR';
import ArusKeuangan from '../../components/ARUS-KEUANGAN';
import Transksi from '../../components/RIWAYAT-TRANSAKSI';
import Chart from '../../components/CHART-AKTIVITAS';
import Navbar from '../../components/NAVBAR';

export default function HOMEWALKEL() {
  return (
    <div className='bg-[#F5F7FA]'>

      <Sidebar />
      <div className='flex flex-col md:ml-64 transition-all duration-300'>
        <Navbar/>
        <h1 className='text-[22px] text-[#343C6A] font-medium pl-6 pt-3'>Arus Keuangan</h1>
      <div>
              

        <ArusKeuangan />
      </div>

      <div>
<Chart/>
      </div>
      <div className='flex flex-col '>
        <div className='flex justify-between pl-6 pr-6'>
          <h1 className='text-[22px] text-[#343C6A] font-medium'>Riwayat Transaksi</h1>
        <button className='text-[16px] text-[#718EBF]'>Lihat Semua</button>
        </div>
        
        <Transksi />
      </div>
      </div>
    </div>
  )
}
