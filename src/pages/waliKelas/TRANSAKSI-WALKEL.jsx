// src/pages/waliKelas/TRANSAKSI-WALKEL.jsx
import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import Riwayat from '../../components/RIWAYAT-TRANSAKSI';
import { Search, ChevronDown, Download } from 'lucide-react';
import WithdrawalModal from '../../components/ModalTambahTransaksi';
import ArusKeuangan from '../../components/ArusKeuangan';

export default function TransaksiWalkel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const dateInputRef = useRef(null);
  const { user } = useSelector((state) => state.auth);

  const download = {
    nominal: "Rp 20.000"
  };

  // Fungsi untuk memicu klik pada input date yang tersembunyi
  const handleDropdownClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  const handleDownload = () => {
    // Implementasi download PDF
    console.log('Downloading transaction data...');
  };

  return (
    <div className='bg-[#F5F7FA] min-h-screen p-6'>
      <h1 className='text-[22px] text-[#343C6A] font-medium mb-4'>
        Arus Keuangan
      </h1>
      
      <div className='mb-6'>
        <ArusKeuangan />
      </div>

      {/* Header dengan tombol tambah transaksi */}
      <div className='bg-white rounded-2xl p-6 shadow-sm mb-6'>
        <div className='flex justify-between items-start mb-6 max-md:flex-col max-md:gap-3'>
          <div>
            <h2 className='text-[18px] text-[#343C6A] font-semibold mb-1'>
              Transaksi Terbaru
            </h2>
            <p className='text-[14px] text-[#718EBF] max-md:hidden'>
              Riwayat Transaksi Terbaru Anda
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className='rounded-2xl text-[16px] bg-[#1814F3] text-white py-2.5 px-6 font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          >
            + Tambah Transaksi
          </button>
        </div>

        {/* Search dan Filter */}
        <div className="flex flex-row justify-between items-center gap-4 mb-6 max-md:flex-col">
          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#718EBF]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-full text-sm text-[#343C6A] placeholder-[#718EBF] focus:ring-2 focus:ring-blue-100 outline-none"
              placeholder="Cari Nama Siswa"
            />
          </div>

          {/* Dropdown tanggal */}
          <div 
            onClick={handleDropdownClick}
            className="relative flex items-center gap-2 cursor-pointer group bg-gray-50 rounded-full px-4 py-3 hover:bg-gray-100 transition-colors"
          >
            <input
              type="date"
              ref={dateInputRef}
              onChange={(e) => setDate(e.target.value)}
              className="absolute opacity-0 pointer-events-none w-0 h-0"
            />
            
            <ChevronDown className="h-5 w-5 text-[#718EBF] group-hover:text-blue-600 transition-colors" />
            <span className="text-[#718EBF] font-medium group-hover:text-blue-600 transition-colors text-sm">
              {date ? new Date(date).toLocaleDateString('id-ID', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              }) : "Pilih Tanggal"}
            </span>
          </div>
        </div>

        {/* Tabel Riwayat Transaksi */}
        <div className='border-t border-gray-100 pt-6'>
          <Riwayat searchQuery={searchQuery} filterDate={date} />
        </div>
      </div>

      {/* Download Data Transaksi */}
      <div className='bg-white rounded-2xl p-6 shadow-sm mb-6'>
        <div className='flex justify-between items-center max-md:flex-col max-md:gap-4'>
          <div className='flex flex-col gap-1'>
            <h2 className='text-[18px] text-[#343C6A] font-semibold'>
              Download Data Transaksi
            </h2>
            <p className='text-[14px] text-[#718EBF] max-md:hidden'>
              Dapatkan data transaksi dalam bentuk PDF
            </p>
          </div>
          <button 
            onClick={handleDownload}
            className='rounded-2xl text-[16px] bg-[#1814F3] text-white py-2.5 px-6 font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2'
          >
            <Download size={18} />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Permintaan Penarikan Tabungan */}
      <div className='bg-white rounded-2xl p-6 shadow-sm'>
        <div className='flex justify-between items-center max-md:flex-col max-md:gap-4'>
          <div className='flex flex-col gap-1 flex-1'>
            <h2 className='text-[18px] text-[#343C6A] font-semibold'>
              Permintaan Penarikan Tabungan
            </h2>
            <p className='text-[14px] text-[#718EBF] max-md:hidden'>
              Informasi mengenai pengajuan penarikan tabungan
            </p>
          </div>
          <div className='bg-blue-50 rounded-2xl text-[18px] text-[#1814F3] px-6 py-3 font-semibold border-2 border-blue-100'>
            {download.nominal}
          </div>
        </div>
      </div>

      <WithdrawalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}