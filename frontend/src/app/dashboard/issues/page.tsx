"use client";
import React from "react";
import { ShieldAlert, AlertCircle, AlertTriangle, Info, CheckCircle, Download, Plus } from "lucide-react";

export default function IssuesPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">ปัญหาที่ต้องติดตาม</h1>
          <p className="text-sm text-slate-500 mt-1">ติดตามและบริหารจัดการปัญหาการดำเนินงานของลูกค้า</p>
        </div>
        <div className="flex gap-3">
           <button className="border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-50"><Download size={16}/> ส่งออกข้อมูล</button>
           <button className="bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-md"><Plus size={16}/> บันทึกปัญหาใหม่</button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { title: "ปัญหาทั้งหมด", value: "0", color: "text-blue-600", icon: <ShieldAlert size={24}/> },
          { title: "High", value: "0", color: "text-red-600", icon: <AlertCircle size={24}/> },
          { title: "Medium", value: "0", color: "text-orange-500", icon: <AlertTriangle size={24}/> },
          { title: "Low", value: "0", color: "text-blue-400", icon: <Info size={24}/> },
          { title: "ปิดแล้ว", value: "0", color: "text-green-600", icon: <CheckCircle size={24}/> },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center hover:-translate-y-1 transition-transform">
            <div className={`flex items-center gap-2 mb-2 ${stat.color} font-bold text-sm`}>{stat.icon} {stat.title}</div>
            <p className={`text-4xl font-black ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Categories (Empty Placeholders like image 9) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
         <h3 className="font-bold text-slate-800 text-sm mb-4">สรุปปัญหาตามประเภท</h3>
         <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center text-slate-400">
            {[1,2,3,4,5,6].map(i => <div key={i} className="border border-slate-100 p-3 rounded-xl bg-slate-50/50">ประเภท {i}<br/><span className="text-xl font-bold">0</span></div>)}
         </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap gap-4 items-center bg-slate-50">
          <input type="text" placeholder="ค้นหา Case No..." className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs w-64 outline-none" />
          <select className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-600 outline-none"><option>ระดับความรุนแรง</option></select>
          <select className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-600 outline-none"><option>สถานะ</option></select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-center text-sm whitespace-nowrap">
            <thead className="bg-white text-slate-500 text-[11px] uppercase font-bold border-b border-slate-200">
              <tr><th className="px-4 py-3">Case No</th><th className="px-4 py-3">ลูกค้า</th><th className="px-4 py-3 text-left">ปัญหา</th><th className="px-4 py-3">วันที่แจ้ง</th><th className="px-4 py-3">ผู้รับผิดชอบ</th><th className="px-4 py-3">ความรุนแรง</th><th className="px-4 py-3">สถานะ</th></tr>
            </thead>
            <tbody><tr><td colSpan={7} className="py-16 text-slate-400">ยังไม่มีการรายงานปัญหา</td></tr></tbody>
          </table>
        </div>
      </div>

      {/* Bottom Split: Detail | Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[300px] flex items-center justify-center text-slate-400 border-dashed border-2">รายละเอียดปัญหา (คลิกเลือกที่ตาราง)</div>
         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[300px] flex items-center justify-center text-slate-400 border-dashed border-2">ประวัติการติดตาม (Timeline)</div>
      </div>
    </div>
  );
}