import React from 'react';
import CardProfile from '../../components/CardProfil';
import CardEditProfile from '../../components/CardInformasiSetting';
import Sidebar from '../../components/SIDEBAR';
import Navbar from '../../components/NAVBAR';

const ProfilePage = () => {
  const userData = {
    nama: "Nurjannah",
    noHp: "03823724244",
    email: "Nurjannahaduhay@gmail.com"
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-6">
      <div className="flex flex-col transition-all duration-300">

      <div className=" px-6 pt-3 flex flex-col justify-between lg:flex-row gap-8">
        <CardProfile data={userData} />
        <CardEditProfile data={userData} />
      </div>
      </div>
    </div>
  );
};

export default ProfilePage;