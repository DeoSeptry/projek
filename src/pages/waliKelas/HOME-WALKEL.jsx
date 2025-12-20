// src/pages/waliKelas/HOME-WALKEL.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import ArusKeuangan from '../../components/ARUS-KEUANGAN';
import Chart from '../../components/CHART-AKTIVITAS';
import Profile from '../../assets/icons/icon-profile.png';

export default function HomeWalkel() {
  const { user } = useSelector((state) => state.auth);

  const DataSiswa = [
    { id: 1, nama: "Laki-laki", jumlah: 12 },
    { id: 2, nama: "Perempuan", jumlah: 8 },
  ];

  return (
    <div className='bg-[#F5F7FA] min-h-screen p-6'>

      <h2 className='text-[22px] text-[#343C6A] font-medium mb-4'>
        Arus Keuangan
      </h2>
      
      <div className='mb-6'>
        <ArusKeuangan />
      </div>

      <div className='mb-6'>
        <Chart />
      </div>
      
      <div>
        <h2 className='text-[22px] text-[#343C6A] font-medium mb-4'>
          Jumlah Siswa
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {DataSiswa.map((item) => (
            <div 
              key={item.id} 
              className="bg-white p-6 rounded-[1.5rem] flex items-center gap-4 shadow-sm"
            >
              <div className="w-[50px] h-[50px] flex-shrink-0">
                <img 
                  src={Profile} 
                  alt={`Icon ${item.nama}`}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-[#718EBF] text-[16px]">
                  {item.nama}
                </span>
                <span className="text-[#1814F3] text-[32px] font-bold leading-tight">
                  {item.jumlah}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}