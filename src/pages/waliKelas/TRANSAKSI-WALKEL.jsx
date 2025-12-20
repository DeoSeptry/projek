import React, { useState, useRef } from 'react'
import Sidebar from '../../components/SIDEBAR'
import Navbar from '../../components/NAVBAR'
import Arus from '../../components/ARUS-KEUANGAN'
import Riwatar from '../../components/RIWAYAT-TRANSAKSI'
import { Search, ChevronDown } from 'lucide-react';
import WithdrawalModal from '../../components/ModalTambahTransaksi'


export default function TRANSAKSI_WALKEL() {
    const [isModalOpen, setIsModalOpen] = useState(false);

  const [date, setDate] = useState("");
  const dateInputRef = useRef(null);
  const download =
    {
      nominal: "Rp, 20.000"
    };
  console.log(download);

  // Fungsi untuk memicu klik pada input date yang tersembunyi
  const handleDropdownClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker(); // Membuka kalender bawaan browser
    }
  };
  return (
    <div className='bg-[#F5F7FA]'>
      <Sidebar />
      <div className='flex flex-col md:ml-64 transition-all duration-300' >
        <Navbar/>
        <h1 className='text-[22px] text-[#343C6A] font-medium pl-6 pt-3'>Arus Keuangan</h1>
        <div className=''>
        <Arus/>
        </div>
        <div className='flex justify-between pl-6 pr-6 max-md:flex-col max-md:gap-3'>
          <div className=''>
            <h1 className='text-[16px] text-[#343C6A] font-semibold'>Transaksi Terbaru</h1>
            <p className='text-[16px] text-[#718EBF] max-md:hidden'>Riwayat Transaksi Terbaru Anda</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className='rounded-2xl text-[16px] bg-[#1814F3] text-white py-2 px-6 font-medium hover:bg-blue-800'
          >
            + Tambah Transaksi
          </button>
        </div>
        <div className="flex flex-row justify-between items-center gap-4 px-6 pt-4">
      <div className="relative w-full md:w-72">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-[#718EBF]" />
        </div>
        <input
          type="text"
          className="block w-full pl-12 pr-4 py-3 bg-white border-none rounded-full text-sm text-[#718EBF] placeholder-[#718EBF] focus:ring-2 focus:ring-blue-100 "
          placeholder="Cari Nama Siswa"
        />
      </div>
{/* dropdown tanggal */}
      <div 
        onClick={handleDropdownClick}
        className="relative flex items-center gap-2 cursor-pointer group"
      >
        <input
          type="date"
          ref={dateInputRef}
          onChange={(e) => setDate(e.target.value)}
          className="absolute opacity-0 pointer-events-none w-0 h-0"
        />
        
        <ChevronDown className="h-5 w-5 text-[#718EBF] group-hover:text-blue-600 transition-colors" />
        <span className="text-[#718EBF] font-medium group-hover:text-blue-600 transition-colors">
          {date ? date : "Tanggal"}
        </span>
      </div>
    </div>

        <div className=''>
        <Riwatar/>
        </div>

        <div className='flex justify-between px-6 max-md:flex-col max-md:gap-2'>
          <div className='flex flex-col gap-1 '>
            <h1 className='text-[16px] text-[#343C6A] font-semibold'>Download Data Transaksi</h1>
            <p className='text-[16px] text-[#718EBF] max-md:hidden'>Dapatkan data transakasi dalam bentuk pdf</p>
          </div>
          <button className='rounded-2xl text-[16px] bg-[#1814F3] text-white py-2 px-6 font-medium'>Download</button>
        </div>

        <div className='flex justify-between px-6 pt-3 max-md:flex-col max-md:gap-2'>
          <div className='flex flex-col gap-1'>
            <h1 className='text-[16px] text-[#343C6A] font-semibold'>Permintaan Penarikan Tabungan</h1>
            <p className='text-[16px] text-[#718EBF] max-md:hidden'>Informasi mengenai penagjuan penarikan tabungan</p>
          </div>
          <div className='rounded-2xl text-[16px] bg-[#1814F3] text-white p-3 font-medium text-center'>{download.nominal}</div>

        </div>

      </div>
            <WithdrawalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  )
}
