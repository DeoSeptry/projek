// src/pages/WaliMurid/TRANSAKSI-WALMUR.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Riwayat from '../../components/RIWAYAT-TRANSAKSI';
import WithdrawalModal from '../../components/Modal1';
import { Wallet, TrendingDown, History } from 'lucide-react';
import ArusKeuangan from '../../components/ArusKeuangan';

export default function TransaksiWalmur() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  // Data dummy - ganti dengan data dari API
  const saldoInfo = {
    saldoTersedia: "Rp 250.000",
    batasMinimal: "Rp 50.000",
    maxPenarikan: "Rp 200.000"
  };

  return (
    <div className='bg-[#F5F7FA] min-h-screen p-6'>
      <h1 className='text-[22px] text-[#343C6A] font-medium mb-4'>
        Arus Keuangan
      </h1>
      
      <div className='mb-6'>
        <ArusKeuangan />
      </div>

      {/* Info Card dengan Tombol Tarik Tunai */}
      <div className='bg-white rounded-2xl p-6 shadow-sm mb-6'>
        <div className='flex justify-between items-start max-md:flex-col max-md:gap-4'>
          <div className='flex-1'>
            <h2 className='text-[18px] text-[#343C6A] font-semibold mb-2'>
              Tabungan {user?.username || 'Wali Murid'}
            </h2>
            <p className='text-[14px] text-[#718EBF] mb-4'>
              Pantau transaksi tabungan dan tarik uang tabunganmu disini
            </p>

            {/* Info Saldo */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
              <div className='flex items-center gap-3 p-3 bg-blue-50 rounded-xl'>
                <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
                  <Wallet className='w-5 h-5 text-blue-600' />
                </div>
                <div>
                  <p className='text-xs text-[#718EBF]'>Saldo Tersedia</p>
                  <p className='text-sm font-semibold text-[#343C6A]'>{saldoInfo.saldoTersedia}</p>
                </div>
              </div>

              <div className='flex items-center gap-3 p-3 bg-orange-50 rounded-xl'>
                <div className='w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center'>
                  <TrendingDown className='w-5 h-5 text-orange-600' />
                </div>
                <div>
                  <p className='text-xs text-[#718EBF]'>Batas Minimal</p>
                  <p className='text-sm font-semibold text-[#343C6A]'>{saldoInfo.batasMinimal}</p>
                </div>
              </div>

              <div className='flex items-center gap-3 p-3 bg-green-50 rounded-xl'>
                <div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center'>
                  <History className='w-5 h-5 text-green-600' />
                </div>
                <div>
                  <p className='text-xs text-[#718EBF]'>Max Penarikan</p>
                  <p className='text-sm font-semibold text-[#343C6A]'>{saldoInfo.maxPenarikan}</p>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className='rounded-2xl text-[16px] bg-[#1814F3] text-white py-2.5 px-6 font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 max-md:w-full whitespace-nowrap'
          >
            Tarik Tunai
          </button>
        </div>
      </div>

      {/* Riwayat Transaksi */}
      <div className='bg-white rounded-2xl p-6 shadow-sm'>
        <div className='mb-6'>
          <h2 className='text-[18px] text-[#343C6A] font-semibold mb-1'>
            Riwayat Transaksi
          </h2>
          <p className='text-[14px] text-[#718EBF]'>
            Lihat semua riwayat transaksi tabungan Anda
          </p>
        </div>

        <div className='border-t border-gray-100 pt-6'>
          <Riwayat />
        </div>
      </div>

      {/* Informasi Penting */}
      <div className='mt-6 bg-blue-50 rounded-2xl p-6 border-2 border-blue-100'>
        <h3 className='text-[16px] text-[#343C6A] font-semibold mb-3 flex items-center gap-2'>
          <div className='w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center'>
            <span className='text-white text-xs font-bold'>i</span>
          </div>
          Informasi Penarikan Tunai
        </h3>
        <ul className='text-[14px] text-[#718EBF] space-y-2 ml-8'>
          <li>• Penarikan tunai membutuhkan waktu proses 1-2 hari kerja</li>
          <li>• Saldo minimal yang harus tersisa adalah {saldoInfo.batasMinimal}</li>
          <li>• Maksimal penarikan per transaksi adalah {saldoInfo.maxPenarikan}</li>
          <li>• Dana akan dikirim ke rekening yang terdaftar</li>
        </ul>
      </div>

      <WithdrawalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}