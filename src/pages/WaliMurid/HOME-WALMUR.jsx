// src/pages/WaliMurid/HOME-WALMUR.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ArusKeuangan from '../../components/ARUS-KEUANGAN';
import Transaksi from '../../components/RIWAYAT-TRANSAKSI';
import Chart from '../../components/CHART-AKTIVITAS';
import { Wallet, TrendingUp, PiggyBank } from 'lucide-react';

export default function HomeWalmur() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const DataKeuangan = [
    { 
      id: 1, 
      nama: "Saldo Tabungan", 
      jumlah: "Rp 250.000",
      icon: PiggyBank,
      color: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    { 
      id: 2, 
      nama: "Total Setoran", 
      jumlah: "Rp 500.000",
      icon: Wallet,
      color: "bg-green-100",
      iconColor: "text-green-600"
    },
    { 
      id: 3, 
      nama: "Total Penarikan", 
      jumlah: "Rp 250.000",
      icon: TrendingUp,
      color: "bg-orange-100",
      iconColor: "text-orange-600"
    },
  ];

  return (
    <div className='bg-[#F5F7FA] min-h-screen p-6'>


      <div className='mb-6'>
        <h2 className='text-[22px] text-[#343C6A] font-medium mb-4'>
          Arus Keuangan
        </h2>
        <ArusKeuangan />
      </div>

      <div className='mb-6'>
        <h2 className='text-[22px] text-[#343C6A] font-medium mb-4'>
          Grafik Aktivitas
        </h2>
        <Chart />
      </div>

      <div className='bg-white rounded-2xl p-6 shadow-sm'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-[22px] text-[#343C6A] font-medium'>
            Riwayat Transaksi
          </h2>
          <button 
            onClick={() => navigate('/transaksiWalmur')}
            className='text-[16px] text-[#718EBF] hover:text-[#1814F3] transition-colors'
          >
            Lihat Semua
          </button>
        </div>
        
        <Transaksi />
      </div>
    </div>
  );
}