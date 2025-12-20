import React from 'react'
// library recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const monthlyData = [
  { name: 'jan', value: 300 }, { name: 'feb', value: 700 },
  { name: 'mar', value: 450 }, { name: 'apr', value: 1350 },
  { name: 'mei', value: 650 }, { name: 'jun', value: 750 },
  { name: 'jul', value: 350 }, { name: 'agus', value: 1650 },
  { name: 'sept', value: 1350 }, { name: 'okt', value: 1850 },
  { name: 'nov', value: 900 }, { name: 'des', value: 1500 },
];

const dailyData = [
  { name: 'Sen', value: 350 }, { name: 'Sel', value: 600 },
  { name: 'Rab', value: 1100 }, { name: 'Kam', value: 350 },
  { name: 'Jum', value: 850 }, { name: 'Sab', value: 650 },
];

export default function CHARTAKTIVITAS() {
  return (
    <div className="flex flex-col md:flex-row gap-6 pl-6 pr-6 pb-6 ">
      <div className='flex-2/3'>
      <h1 className='text-[22px] text-[#343C6A] font-medium pb-2'>Aktivitas Bulanan</h1>
      <div className=" bg-white p-6 rounded-[2rem] ">
        
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#718EBF', fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#718EBF', fontSize: 12 }}
                tickFormatter={(value) => `Rp ${value}k`}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#1814F3" 
                strokeWidth={2} 
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      </div>
<div className='flex-1/3 '>
          <h1 className='text-[22px] text-[#343C6A] font-medium pb-2'>Aktivitas Harian</h1>


      <div className=" bg-white p-6 rounded-[2rem] ">
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#718EBF', fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#718EBF', fontSize: 12 }}
                tickFormatter={(value) => `Rp ${value}k`}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#1814F3" 
                strokeWidth={2} 
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      </div>

    </div>
  )
}