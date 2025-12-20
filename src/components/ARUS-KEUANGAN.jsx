import React from 'react'
import iconSaldo from '../assets/icon-saldo.png'
import iconSetor from '../assets/icon-setor.png'
import iconTarik from '../assets/icon-tarik.png'

export default function ARUSKEUANGAN() 
{
    
  const data = [
    {
      title: "Total Setoran",
      amount: "Rp. 150.000",
      icon: iconSetor,
      bgColor: "bg-[#E7EDFF]" 
    },
    {
      title: "Total Penarikan",
      amount: "Rp. 50.000",
      icon: iconTarik,
      bgColor: "bg-[#FFE0EB]"
    },
    {
      title: "Total Saldo",
      amount: "Rp. 500.000",
      icon: iconSaldo,
      bgColor: "bg-[#DCFAF8]"
    },
  ]
    
  return (
    <div className=''>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-md:gap-4 p-6">
        {data.map((item, index) => (
          <div 
            key={index} 
            className="bg-white p-1 max-md:p-0 rounded-3xl  flex items-center max-md:gap-2 gap-5 border border-slate-50"
          >
            {/* Icon Circle */}
            <div className={` p-5 rounded-full flex items-center justify-center`}>
              <img className='max-md:w-[51px]' src= {item.icon}/>
            </div>

            {/* Text Content */}
            <div className="flex flex-col">
              <span className="text-[#718EBF] max-lg:text-[14px] text-[16px] ">
                {item.title}
              </span>
              <span className="text-[#343C6A] max-lg:text-[13px] text-[20px] font-semibold">
                {item.amount}
              </span>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  )
}
