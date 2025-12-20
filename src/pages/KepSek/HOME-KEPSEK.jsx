import React from 'react'
import ArusKeuangan from '../../components/ARUS-KEUANGAN';
import Chart from '../../components/CHART-AKTIVITAS';
import Profile from '../../assets/icons/icon-profile.png'

export default function HOMEKEPSEK() {

  const DataKelas = [
    {id:1, nama: "Kelas 1", jumlah :20},
    {id:2, nama: "Kelas 2", jumlah :20},
    {id:3, nama: "Kelas 3", jumlah :20},
    {id:4, nama: "Kelas 4", jumlah :20},
    {id:5, nama: "Kelas 5", jumlah :20},
    {id:6, nama: "Kelas 6", jumlah :20},
  ];

  return (
    <div className='bg-[#F5F7FA] min-h-screen p-6'>
      <h1 className='text-[22px] text-[#343C6A] font-medium mb-4'>Arus Keuangan</h1>
      
      <div>
        <ArusKeuangan />
      </div>

      <div>
        <Chart/>
      </div>
      
      <div>
        <h1 className='text-[22px] text-[#343C6A] font-medium mb-4'>Jumlah Siswa Siswi</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {DataKelas.map((item) => (
            <div 
              key={item.id} 
              className="bg-white p-4 rounded-[1.5rem] flex items-center gap-4"
            >
              {/* Lingkaran Ikon */}
              <div className="max-lg:w-[44px] max-lg:h-[44px]">
                <img src={Profile} alt="" />
              </div>

              {/* Informasi Teks */}
              <div className="flex flex-col">
                <span className="text-[#718EBF] text-[16px] max-lg:text-[12px]">
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
  )
}