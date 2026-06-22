"use client";
import React from "react";
import { Users, UserCheck, Clock, UserPlus, Search, Plus } from "lucide-react";

export default function CustomersPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
        <span>Dashboard</span> <span className="text-slate-300">{'>'}</span> <span className="text-blue-600 font-medium">ลูกค้า</span>
      </div>
      <h1 className="text-3xl font-bold text-slate-800">ลูกค้า</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "ลูกค้าทั้งหมด", value: "0", color: "text-blue-600", bg: "bg-blue-100", icon: <Users size={20}/> },
          { title: "ลูกค้า Active", value: "0", color: "text-green-600", bg: "bg-green-100", icon: <UserCheck size={20}/> },
          { title: "ต้องติดตาม", value: "0", color: "text-amber-500", bg: "bg-amber-100", icon: <Clock size={20}/> },
          { title: "ลูกค้าใหม่เดือนนี้", value: "0", color: "text-blue-500", bg: "bg-blue-100", icon: <UserPlus size={20}/> },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center flex flex-col items-center hover:-translate-y-1 transition-transform">
            <div className={`flex items-center gap-2 mb-2 ${stat.color} font-bold text-sm`}>
              <div className={`p-1.5 rounded-full ${stat.bg}`}>{stat.icon}</div> {stat.title}
            </div>
            <p className={`text-4xl font-black ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-slate-400 mt-1">ราย</p>
          </div>
        ))}
      </div>

      {/* Main Grid: Left (Table/Charts) | Right (Profile Sidebar) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        <div className="xl:col-span-2 space-y-6">
          {/* Filters */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="ค้นหาชื่อลูกค้า, บริษัท, โทรศัพท์..." className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none" />
            </div>
            <select className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-600"><option>Segment ทั้งหมด</option></select>
            <select className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-600"><option>Status ทั้งหมด</option></select>
            <button className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50">ล้างตัวกรอง</button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800 text-sm">รายชื่อลูกค้า (0 ราย)</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-center text-sm">
                <thead className="bg-white text-slate-500 text-xs font-bold border-b border-slate-200">
                  <tr><th className="px-4 py-3 text-left">ลูกค้า</th><th className="px-4 py-3 text-left">บริษัท</th><th className="px-4 py-3">โทรศัพท์</th><th className="px-4 py-3">Active Cases</th><th className="px-4 py-3">สถานะ</th></tr>
                </thead>
                <tbody><tr><td colSpan={5} className="py-12 text-slate-400">ยังไม่มีข้อมูลลูกค้า</td></tr></tbody>
              </table>
            </div>
          </div>

          {/* Charts Row */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[250px] flex items-center justify-center text-slate-400 border-dashed border-2">
             <p>ภาพรวมลูกค้า (รอเชื่อมต่อข้อมูลกราฟ)</p>
          </div>
        </div>

        {/* Right Sidebar: Profile */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex justify-end"><button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1"><Plus size={14}/> เพิ่มลูกค้า</button></div>
          <div className="text-center py-10 text-slate-400 border-2 border-dashed border-slate-100 rounded-xl">
             <UserCheck size={48} className="mx-auto mb-2 text-slate-200" />
             <p className="font-medium text-sm">คลิกที่รายชื่อลูกค้า<br/>เพื่อดูโปรไฟล์และกิจกรรม</p>
          </div>
        </div>

      </div>
    </div>
  );
}