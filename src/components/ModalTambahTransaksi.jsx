import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

const WithdrawalModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1); 
  const [formData, setFormData] = useState({
    amount: '',
    nama: '',
  });

  const dataSiswa = ["Deo Septry Wengi", "Andi"];

  if (!isOpen) return null;

  const handleClose = () => {
    setFormData({ amount: '', nama: '' });
    setStep(1);
    onClose();
  };

  const isFormValid = formData.amount.trim() !== '' && formData.nama.trim() !== '';

  const formatRupiah = (angka) => {
    const numberString = angka.replace(/[^,\d]/g, "").toString();
    const split = numberString.split(",");
    const sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      const separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
    return rupiah ? "Rp. " + rupiah : "";
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className={`relative w-full bg-[#F5F7FA] rounded-[40px] transition-all duration-300 ${step === 3 ? 'max-w-md p-12' : 'max-w-md p-8'}`}>
        
        <button onClick={handleClose} className="absolute p-1 right-6 top-6 hover:bg-gray-200 rounded-full">
          <X size={20} className="text-[#343C6A]" />
        </button>

        <div className="mt-4 text-left">
          {step <= 2 && (
            <>
              {step === 2 && (
                <h2 className="text-[#343C6A] font-bold text-center text-lg leading-tight px-4 mb-5">
                  Apakah Anda Yakin Untuk Menambah Data Transaksi Baru?
                </h2>
              )}

              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <label className="block text-[#343C6A] font-bold text-sm ml-1">Nama Siswa</label>
                  <div className="relative">
                    <select 
                      disabled={step === 2}
                      value={formData.nama} 
                      onChange={(e) => setFormData({...formData, nama: e.target.value})} 
                      className={`w-full px-4 py-3 bg-white border-none rounded-2xl text-[#718EBF] focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer ${step === 2 ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      <option value="" disabled>Pilih Nama Siswa</option>
                      {dataSiswa.map((siswa, index) => (
                        <option key={index} value={siswa}>{siswa}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <ChevronDown size={20} className="text-[#718EBF]" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[#343C6A] font-bold text-sm ml-1">Nominal Uang</label>
                  <input 
                    type="text" 
                    inputMode="numeric"
                    readOnly={step === 2}
                    placeholder="Rp. 0"
                    value={formData.amount} 
                    onChange={(e) => setFormData({...formData, amount: formatRupiah(e.target.value)})}
                    className={`w-full px-4 py-3 bg-white border-none rounded-2xl text-[#718EBF] focus:ring-2 focus:ring-blue-500 outline-none ${step === 2 ? 'opacity-70 cursor-not-allowed' : ''}`} 
                  />
                </div>
              </div>

              <div className="mt-6">
                {step === 1 ? (
                  <button 
                    onClick={() => setStep(2)} 
                    disabled={!isFormValid}
                    className={`w-full py-4 text-white font-bold rounded-2xl transition-all ${
                      isFormValid ? "bg-[#0000FF] hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed opacity-70"
                    }`}
                  >
                    Tambah
                  </button>
                ) : (
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setStep(1)} 
                      className="flex-1 py-4 text-white font-bold bg-[#FF5A5A] rounded-2xl hover:bg-red-600 transition-all"
                    >
                      Kembali
                    </button>
                    <button 
                      onClick={() => setStep(3)} 
                      className="flex-1 py-4 text-white font-bold bg-[#0000FF] rounded-2xl hover:bg-blue-700 transition-all"
                    >
                      Ya
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {step === 3 && (
            <div className="py-6 px-2 text-center">
              <h2 className="text-[#343C6A] font-bold text-xl leading-relaxed">
                Selamat Anda Berhasil Menambahkan Data Transaksi Baru!
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WithdrawalModal;