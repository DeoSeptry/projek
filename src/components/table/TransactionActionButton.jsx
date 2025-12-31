// Tambahkan komponen ini ke TransactionTable atau buat sebagai utility component
// src/components/table/TransactionActionButton.jsx

import React from 'react';
import { Edit2, CheckCircle } from 'lucide-react';

export function TransactionActionButton({ transaction, onEdit, onApprove }) {
  const isPendingWithdrawal = 
    transaction.type === 'WITHDRAWAL' && 
    transaction.status === 'PENDING';

  const handleClick = () => {
    if (isPendingWithdrawal) {
      onApprove(transaction);
    } else {
      onEdit(transaction);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="relative p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
      title={isPendingWithdrawal ? 'Approve Penarikan' : 'Edit Transaksi'}
    >
      {isPendingWithdrawal ? (
        <>
          {/* Icon Approve */}
          <CheckCircle className="w-5 h-5" />
          {/* Badge Merah */}
          <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </>
      ) : (
        <Edit2 className="w-5 h-5" />
      )}
    </button>
  );
}