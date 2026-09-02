// src/pages/KepalaSekolah/HomeKepalaSekolah.jsx
import React from "react";
import iconProfile from "../../assets/icons/icon-profile.png";
import { useGetStudentsTotalQuery } from "../../services/api/students.api";

import CharAktivitas from "../../components/ChartAktivitas";
import ArusKeuangan from "../../components/ArusKeuangan";

export default function HomeKepalaSekolah() {


  // ✅ total siswa per grade
  const {
    data: studentsTotal,
    isLoading: isLoadingStudentsTotal,
    error: studentsTotalError,
  } = useGetStudentsTotalQuery();

  const dataKelasSekolah = React.useMemo(() => {
    return [
      { id: 1, namaKelas: "Kelas 1", jumlahSiswa: studentsTotal?.grade1 ?? 0 },
      { id: 2, namaKelas: "Kelas 2", jumlahSiswa: studentsTotal?.grade2 ?? 0 },
      { id: 3, namaKelas: "Kelas 3", jumlahSiswa: studentsTotal?.grade3 ?? 0 },
      { id: 4, namaKelas: "Kelas 4", jumlahSiswa: studentsTotal?.grade4 ?? 0 },
      { id: 5, namaKelas: "Kelas 5", jumlahSiswa: studentsTotal?.grade5 ?? 0 },
      { id: 6, namaKelas: "Kelas 6", jumlahSiswa: studentsTotal?.grade6 ?? 0 },
    ];
  }, [studentsTotal]);

  return (
    <div className="bg-[#F5F7FA] min-h-screen p-6">
      <h1 className="text-[22px] text-[#343C6A] font-medium mb-4">
        Arus Keuangan
      </h1>

      <ArusKeuangan/>

      <div className="mt-6">
        <CharAktivitas />
      </div>

      <div className="mt-6">
        <h1 className="text-[22px] text-[#343C6A] font-medium mb-4">
          Jumlah Siswa Siswi
        </h1>

        {studentsTotalError ? (
          <p className="text-sm text-red-600 mb-3">
            Gagal memuat total siswa
          </p>
        ) : null}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {dataKelasSekolah.map((kelas) => (
            <div
              key={kelas.id}
              className="bg-white p-4 rounded-[1.5rem] flex items-center gap-4"
            >
              <div className="max-lg:w-[44px] max-lg:h-[44px]">
                <img src={iconProfile} alt="Icon Profile" />
              </div>

              <div className="flex flex-col">
                <span className="text-[#718EBF] text-[16px] max-lg:text-[12px]">
                  {kelas.namaKelas}
                </span>

                <span className="text-[#1814F3] text-[32px] font-bold leading-tight">
                  {isLoadingStudentsTotal ? "..." : kelas.jumlahSiswa}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
