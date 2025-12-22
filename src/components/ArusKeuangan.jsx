// src/components/ArusKeuangan.jsx
import React from "react";
import { useGetTransactionTotalAmountsQuery } from "../services/api/transactions.api";
import iconSaldo from "../assets/icon-saldo.png";
import iconSetor from "../assets/icon-setor.png";
import iconTarik from "../assets/icon-tarik.png";

function formatIDR(value) {
  const numericValue = Number(value || 0);
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(numericValue);
}

export default function ArusKeuangan() {
  const { 
    data: totals, 
    isLoading, 
    error 
  } = useGetTransactionTotalAmountsQuery();

  const cashFlowData = [
    {
      title: "Total Setoran",
      amount: formatIDR(totals?.totalDeposits ?? 0),
      icon: iconSetor,
    },
    {
      title: "Total Penarikan",
      amount: formatIDR(totals?.totalWithdrawals ?? 0),
      icon: iconTarik,
    },
    {
      title: "Total Saldo",
      amount: formatIDR(totals?.totalBalances ?? 0),
      icon: iconSaldo,
    },
  ];

  return (
    <div className="">
      {error && (
        <p className="text-sm text-red-600 mb-3">
          Gagal memuat data arus keuangan
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-md:gap-4">
        {cashFlowData.map((item) => (
          <div
            key={item.title}
            className="bg-white p-1 max-md:p-0 rounded-3xl flex items-center max-md:gap-2 gap-2 border border-slate-50"
          >
            <div className="p-5 rounded-full flex items-center justify-center">
              <img 
                className="max-md:w-[51px]" 
                src={item.icon} 
                alt={item.title} 
              />
            </div>

            <div className="flex flex-col">
              <span className="text-[#718EBF] max-lg:text-[14px] text-[16px]">
                {item.title}
              </span>
              <span className="text-[#343C6A] max-lg:text-[13px] text-[20px] font-semibold">
                {isLoading ? "Memuat..." : item.amount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}