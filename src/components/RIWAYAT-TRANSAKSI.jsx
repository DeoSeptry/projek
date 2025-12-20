import React from 'react'

export default function RIWAYATTRANSAKSI() {
    const transactions = Array(5).fill({
    nama: "Deo Septry",
    kelas: "5",
    nominal: "Rp. 10.000",
    total: "Rp. 30.000",
    tanggal: "28 Jan 2024",
    hp: "09821281212",
    status: "Sukses"
  });
  return (
    <div className='p-6'>
      <table className="w-full text-left text-[12px] lg:text-[16px] bg-white rounded-3xl">
            <thead className=' '>
              <tr className="text-[#718EBF] border-gray-50 ">
                <th className="pb-4 px-6 py-5 font-light">Nama</th>
                <th className="pb-4 py-5 font-light">Kelas</th>
                <th className="pb-4 py-5 font-light">Nominal</th>
                <th className="pb-4 py-5 font-light">Jumlah Tabungan</th>
                <th className="pb-4 py-5 font-light">Tanggal Transaksi</th>
                <th className="pb-4 py-5 font-light">No Hp</th>
                <th className="pb-4 py-5 font-light">Status</th>
                <th className="pb-4 px-6 py-5 font-light">Edit</th>
              </tr>
            </thead>
            <tbody className=" ">
              {transactions.map((t, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-slate-50/50 transition-colors text-[#343C6A]">
                  <td className="py-5   px-6">{t.nama}</td>
                  <td>{t.kelas}</td>
                  <td>{t.nominal}</td>
                  <td className="">{t.total}</td>
                  <td>{t.tanggal}</td>
                  <td>{t.hp}</td>
                  <td>
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-bold">Sukses</span>
                  </td>
                  <td className="flex items-center gap-3 py-5">
                    {/* <Trash2 size={18} className="text-red-400 cursor-pointer" />
                    <Printer size={18} className="text-yellow-400 cursor-pointer" /> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
    </div>
  )
}
