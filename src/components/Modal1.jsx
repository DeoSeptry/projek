import React, { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';

const WithdrawalModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1); 
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    amount: '',
    reason: '',
    password: ''
  });

  if (!isOpen) return null;

  const handleClose = () => {
    setFormData({ amount: '', reason: '', password: '' });
    setStep(1);
    onClose();
  };

  const isFormValid = formData.amount.trim() !== '' && formData.password.trim() !== '';

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className={`relative w-full bg-[#F5F7FA] rounded-[40px] transition-all duration-300 ${step === 3 ? 'max-w-md p-12' : 'max-w-md p-8'}`}>
        
        <button onClick={handleClose} className="absolute p-1 right-6 top-6 hover:bg-gray-200 rounded-full">
          <X size={20} className="text-gray-600" />
        </button>

        <div className="mt-4 text-left">
          
          {step <= 2 && (
            <>
              {step === 2 && (
                <h2 className="text-[#343C6A] font-bold text-center text-lg leading-tight px-4 mb-5">
                  Apakah Anda Yakin Untuk menarik uang tabungan anda?
                </h2>
              )}

              <div className="space-y-4 pt-2">
                
                <div className="space-y-2">
                  <label className="block text-[#343C6A] font-bold text-sm ml-1">Nominal Penarikan</label>
                  <input 
                    type="text" 
                    inputMode="numeric"
                    placeholder="Rp. 0"
                    value={formData.amount} 
                    readOnly={step === 2} 
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      setFormData({...formData, amount: value ? `Rp. ${value}` : ""});
                    }}
                    className={`w-full px-4 py-3 bg-white border-none rounded-2xl text-[#718EBF] focus:ring-2 focus:ring-blue-500 outline-none ${step === 2 ? 'opacity-70 cursor-not-allowed' : ''}`} 
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[#343C6A] font-bold text-sm ml-1">Alasan</label>
                  <input 
                    type="text" 
                    placeholder="Masukkan alasan..."
                    value={formData.reason} 
                    readOnly={step === 2} 
                    onChange={(e) => setFormData({...formData, reason: e.target.value})} 
                    className={`w-full px-4 py-3 bg-white border-none rounded-2xl text-[#718EBF] focus:ring-2 focus:ring-blue-500 outline-none ${step === 2 ? 'opacity-70 cursor-not-allowed' : ''}`} 
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[#343C6A] font-bold text-sm ml-1">Kata Sandi</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••"
                      value={formData.password} 
                      readOnly={step === 2} 
                      onChange={(e) => setFormData({...formData, password: e.target.value})} 
                      className={`w-full px-4 py-3 bg-white border-none rounded-2xl text-[#718EBF] focus:ring-2 focus:ring-blue-500 outline-none ${step === 2 ? 'opacity-70 cursor-not-allowed' : ''}`} 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)} 
                      className="absolute text-[#718EBF] -translate-y-1/2 right-4 top-1/2"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
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
                    Ajukan Penarikan
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
                Selamat anda berhasil mengajukan penarikan uang tabungan, tunggu hingga petugas pencatatan menyetujui pengajuan anda
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WithdrawalModal;