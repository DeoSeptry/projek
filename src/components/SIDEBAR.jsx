import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  UserCircle, 
  Settings, 
  Menu, 
  X,
  FolderOpen
} from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Daftar menu navigasi
  const menuItems = [
    { name: 'Dashboard', path: '/home', icon: <LayoutDashboard size={20} /> },
    { name: 'Transaksi', path: '/transaksi', icon: <ArrowLeftRight size={20} /> },
    { name: 'Akun', path: '/akun', icon: <UserCircle size={20} /> },
    { name: 'Setting', path: '/setting', icon: <Settings size={20} /> },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Tombol Hamburger - Muncul hanya di layar kecil (sm/md) */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={toggleSidebar}
          className="p-2 bg-blue-600 text-white rounded-lg shadow-lg"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay untuk menutup sidebar saat klik di luar (layar mobile) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Kontainer Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full bg-white border-r border-gray-100 z-40 transition-transform duration-300 ease-in-out
        w-64 md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        {/* Logo Section */}
<div className="pl-6 pt-2 ">
  <img className='w-[125px] h-[34px]' src={Logo} alt="Logo" />
</div>
        {/* Menu Items */}
        <nav className="mt-6 px-3 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false); // Tutup sidebar setelah klik di mobile
                }}
                className={`
                  w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-medium
                  ${isActive 
                    ? 'bg-blue-50 text-[#1814F3]' 
                    : 'text-slate-400 hover:bg-gray-50 hover:text-slate-600'}
                `}
              >
                <span className={isActive ? 'text-blue-600' : 'text-slate-400'}>
                  {item.icon}
                </span>
                {item.name}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;