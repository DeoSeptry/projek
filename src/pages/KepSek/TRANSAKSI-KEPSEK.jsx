// src/pages/WaliMurid/TRANSAKSI-WALMUR.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Arus from '../../components/ARUS-KEUANGAN';
import WithdrawalModal from '../../components/Modal1';

export default function TransaksiWalmur() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  return (
    <div className='bg-[#F5F7FA] min-h-screen p-6'>

      
      <div className='mb-6'>
        <Arus />
      </div>

      <div className='bg-white rounded-2xl p-6 shadow-sm'>
        <div className='flex justify-between items-start max-md:flex-col max-md:gap-4'>
          <div className='flex flex-col gap-1'>
            <h1 className='text-[18px] text-[#343C6A] font-semibold'>
              {user?.username || 'Wali Murid'}
            </h1>
            <p className='text-[14px] text-[#718EBF] max-md:text-[12px]'>
              Pantau transaksi tabungan dan tarik uang tabunganmu disini
            </p>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className='rounded-2xl text-[16px] bg-[#1814F3] text-white py-2.5 px-6 font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 max-md:w-full'
          >
            Tarik Tunai
          </button>
        </div>

        {/* Area untuk menampilkan riwayat transaksi */}
        <div className='mt-6 border-t border-gray-100 pt-6'>
          <h2 className='text-[16px] text-[#343C6A] font-semibold mb-4'>
            Riwayat Transaksi
          </h2>
          
          {/* Placeholder untuk tabel/list transaksi */}
          <div className='text-center py-8 text-gray-400'>
            <p className='text-sm'>Belum ada transaksi</p>
          </div>
        </div>
      </div>

      <WithdrawalModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}