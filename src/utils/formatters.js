// src/utils/formatters.js
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (isoString) => {
  return new Date(isoString).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

   export const formatBalance = (balance) => {
    if (balance === null || balance === undefined || isNaN(balance)) {
      return '-';
    }
    return formatCurrency(balance);
  };