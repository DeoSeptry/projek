import React from 'react';
import { Pencil } from 'lucide-react';

const CardProfile = ({ data }) => {
  return (
    <div className="bg-white rounded-3xl p-8 flex flex-col flex-1/3 items-center">
      {/* Foto Profil dengan Tombol Edit */}
      <div className="relative mb-6">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white ">
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        <button className="absolute bottom-1 right-1 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 transition-colors border-2 border-white">
          <Pencil size={14} fill="currentColor" />
        </button>
      </div>

      {/* Detail Profil */}
      <div className="w-full space-y-4">
        <h2 className="text-[#343C6A] font-bold text-lg mb-4">Profil Saya</h2>
        
        <div className="flex justify-between border-b border-gray-100 pb-2">
          <span className="text-[#718EBF] text-sm">{data.nama}</span>
          <span className="text-[#343C6A] text-sm font-medium">{data.noHp}</span>
        </div>
        
        <div className="border-b border-gray-100 pb-2">
          <span className="text-[#718EBF] text-sm block">{data.email}</span>
        </div>
      </div>
    </div>
  );
};

export default CardProfile;