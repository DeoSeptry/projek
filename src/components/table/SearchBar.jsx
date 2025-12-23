// src/components/SearchBar/SearchBar.jsx
import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({
  value = "",
  onChange,
  placeholder = "Cari...",
  className = "",
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-blue-500 block w-full pl-10 p-2.5"
      />
    </div>
  );
}