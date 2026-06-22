"use client";
import React from "react";
import Image from "next/image";
import { Bell, ChevronDown, UserCircle2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { user } = useAuth();
  
  if (!user) return null;

  return (
    <header className="h-16 bg-[#1e3a8a] fixed top-0 w-full z-30 flex items-center justify-between px-6 shadow-md transition-all">
      
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center overflow-hidden p-1 shadow-sm">
           <Image 
             src="/logo.png" 
             alt="CYD Logo" 
             width={48} 
             height={48} 
             className="object-contain" 
             priority 
           />
        </div>
        
        <div className="border-l-2 border-blue-700/50 pl-4 py-1 leading-tight">
          <h1 className="font-bold text-xs text-white uppercase tracking-wide">CHAIDET PROGRESS</h1>
          <p className="text-[10px] text-blue-200 font-medium uppercase tracking-widest mt-0.5">CO., LTD.</p>
        </div>
      </div>

      {/* ฝั่งขวา: แจ้งเตือน & โปรไฟล์ */}
      <div className="flex items-center gap-6">
        {/* กระดิ่งแจ้งเตือน */}
        <div className="relative cursor-pointer group">
          <div className="p-2.5 rounded-full bg-blue-900/40 hover:bg-blue-800 transition-all shadow-inner">
            <Bell className="text-blue-100 group-hover:text-white transition-colors" size={20} />
          </div>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#1e3a8a] shadow-md">
            2
          </span>
        </div>

        {/* โปรไฟล์ผู้ใช้งาน */}
        <div className="flex items-center gap-3 cursor-pointer hover:bg-blue-900/40 p-1.5 pr-3 rounded-full transition-all border border-transparent hover:border-blue-700/50">
          <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 shadow-sm border-2 border-blue-200">
            <UserCircle2 size={24} />
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-bold text-white leading-none">{user.name}</p>
            <p className="text-[11px] text-blue-300 font-medium mt-1 capitalize">
              {user.role === 'admin' ? 'Administrator' : 'User'}
            </p>
          </div>
          <ChevronDown size={16} className="text-blue-400 ml-1" />
        </div>
      </div>
    </header>
  );
}