"use client";
import React from "react";
import { Calendar, Users, BarChart3, Download } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold text-slate-800">รายงาน (Reports)</h1>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Col: Filters & Selectors */}
        <div className="space-y-6">
           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-slate-800 text-sm mb-4">เลือกประเภทรายงาน</h3>
             <div className="grid grid-cols-2 gap-3">
                <button className="p-4 rounded-xl border-2 border-blue-600 bg-blue-50 text-blue-700 flex flex-col items-center gap-2"><Calendar size={24}/><span className="text-xs font-bold">รายงานประจำวัน</span></button>
                <button className="p-4 rounded-xl border-2 border-slate-100 text-slate-500 hover:border-slate-200 flex flex-col items-center gap-2"><Calendar size={24}/><span className="text-xs font-bold">รายงานประจำสัปดาห์</span></button>
             </div>
           </div>
           
           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
             <h3 className="font-bold text-slate-800 text-sm">ตัวกรองข้อมูล</h3>
             <div><label className="text-xs font-bold text-slate-600">ช่วงวันที่</label><input type="date" className="w-full p-2.5 mt-1 rounded-xl border border-slate-200 text-sm" /></div>
             <div><label className="text-xs font-bold text-slate-600">แผนก</label><select className="w-full p-2.5 mt-1 rounded-xl border border-slate-200 text-sm"><option>ทั้งหมด</option></select></div>
             <button className="w-full bg-blue-600 text-white py-3 rounded-xl text-sm font-bold shadow-md mt-2">สร้างรายงาน</button>
           </div>
        </div>

        {/* Right Col: Preview & Export */}
        <div className="xl:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
           <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
              <h3 className="font-bold text-slate-800">สรุปภาพรวมรายงาน (รอสร้างข้อมูล)</h3>
              <div className="flex gap-2">
                 <button className="border border-green-600 text-green-600 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2"><Download size={14}/> Excel</button>
                 <button className="border border-red-600 text-red-600 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2"><Download size={14}/> PDF</button>
              </div>
           </div>
           <div className="flex-1 flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-100 rounded-xl min-h-[400px]">
              <div className="text-center"><BarChart3 size={48} className="mx-auto mb-3 text-slate-300"/><p>กรุณากด "สร้างรายงาน" เพื่อดูตัวอย่างกราฟและข้อมูลสรุป</p></div>
           </div>
        </div>
      </div>
    </div>
  );
}