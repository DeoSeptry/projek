import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const CardEditProfile = ({ data }) => {
  const [showPass, setShowPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  return (
    <div className="bg-white rounded-3xl p-8 flex-2/3">
      <h2 className="text-[#343C6A] font-bold text-xl mb-3 text-left">Edit Profil</h2>
      
      <div className="grid grid-cols-1  md:grid-cols-2 gap-6 max-md:gap-4 text-left">
        {/* Nama */}
        <div className="space-y-2">
          <label className="text-[#343C6A] font-semibold text-sm ml-1">Nama</label>
          <input 
            type="text" 
            disabled
            defaultValue={data.nama}
            className="w-full px-4 py-3 border border-[#E6EFF5] rounded-xl text-[#718EBF] focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Kata Sandi */}
        <div className="space-y-2">
          <label className="text-[#343C6A] font-semibold text-sm ml-1">Kata Sandi</label>
          <div className="relative">
            <input 
              type={showPass ? "text" : "password"} 
              defaultValue="pusingnyo"
              className="w-full px-4 py-3 border border-[#E6EFF5] rounded-xl text-[#718EBF] focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#718EBF]">
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* No Hp */}
        <div className="space-y-2">
          <label className="text-[#343C6A] font-semibold text-sm ml-1">No Hp</label>
          <input 
            type="text" 
            disabled
            defaultValue={data.noHp}
            className="w-full px-4 py-3 border border-[#E6EFF5] rounded-xl text-[#718EBF] focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Kata Sandi Baru */}
        <div className="space-y-2">
          <label className="text-[#343C6A] font-semibold text-sm ml-1">Kata Sandi Baru</label>
          <div className="relative">
            <input 
              type={showNewPass ? "text" : "password"} 
              placeholder="**********"
              className="w-full px-4 py-3 border border-[#E6EFF5] rounded-xl text-[#718EBF] focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button onClick={() => setShowNewPass(!showNewPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#718EBF]">
              {showNewPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Email - Span Full Width */}
        <div className="md:col-span-2 space-y-2">
          <label className="text-[#343C6A] font-semibold text-sm ml-1">Email</label>
          <input 
            type="email" 
            defaultValue={data.email}
            className="w-full px-4 py-3 border border-[#E6EFF5] rounded-xl text-[#718EBF] focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Tombol Simpan */}
      <div className="mt-10 flex justify-end">
        <button className="bg-[#1814F3] text-white px-16 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-blue-200">
          Simpan
        </button>
      </div>
    </div>
  );
};

export default CardEditProfile;