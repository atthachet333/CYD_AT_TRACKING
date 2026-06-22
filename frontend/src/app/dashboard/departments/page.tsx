"use client";
import React, { useState } from "react";
import { 
  Users, UserCheck, Activity, CalendarOff, Search, 
  Filter, Plus, Building2, PieChart, Info 
} from "lucide-react";

export default function StaffAndDepartmentsPage() {
  // สร้าง State สำหรับสลับ Tab
  const [activeTab, setActiveTab] = useState("staff");

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* 1. Header & Tabs */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">พนักงาน / แผนก</h1>
        <div className="flex gap-6 mt-6 border-b border-slate-200">
          <button 
            onClick={() => setActiveTab("staff")}
            className={`pb-3 text-sm font-bold border-b-2 transition-all ${
              activeTab === "staff" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            พนักงาน
          </button>
          <button 
            onClick={() => setActiveTab("dept")}
            className={`pb-3 text-sm font-bold border-b-2 transition-all ${
              activeTab === "dept" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            แผนก
          </button>
        </div>
      </div>

      {/* 2. Stat Cards (4 ช่อง) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "พนักงานทั้งหมด", value: "0", color: "text-blue-600", bg: "bg-blue-100", icon: <Users size={24}/> },
          { title: "พนักงานออนไลน์", value: "0", color: "text-green-600", bg: "bg-green-100", icon: <UserCheck size={24}/> },
          { title: "ภาระงานสูง", value: "0", color: "text-orange-500", bg: "bg-orange-100", icon: <Activity size={24}/> },
          { title: "ลางานวันนี้", value: "0", color: "text-red-500", bg: "bg-red-100", icon: <CalendarOff size={24}/> },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center hover:-translate-y-1 transition-transform">
            <div className={`flex items-center gap-2 mb-3 ${stat.color} font-bold text-sm`}>
              <div className={`p-2 rounded-xl ${stat.bg}`}>{stat.icon}</div>
              {stat.title}
            </div>
            <p className={`text-4xl font-black ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-slate-400 font-semibold mt-1">คน</p>
          </div>
        ))}
      </div>

      {/* 3. Table: รายชื่อพนักงาน */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Header & Filters */}
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <h3 className="font-bold text-slate-800 text-base">รายชื่อพนักงาน</h3>
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <div className="relative flex-1 min-w-[250px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="ค้นหาชื่อพนักงาน, เบอร์โทร, แผนก" className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-slate-50 transition-colors">
              <Filter size={16} /> ตัวกรอง
            </button>
            <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm hover:bg-blue-700 transition-colors">
              <Plus size={16} /> เพิ่มพนักงาน
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-center text-sm whitespace-nowrap">
            <thead className="bg-white text-slate-500 text-xs font-bold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left">ชื่อพนักงาน</th>
                <th className="px-6 py-4">แผนก</th>
                <th className="px-6 py-4">ตำแหน่ง</th>
                <th className="px-6 py-4">จำนวนเคส</th>
                <th className="px-6 py-4">สถานะงาน</th>
                <th className="px-6 py-4">เบอร์โทร</th>
                <th className="px-6 py-4">สิทธิ์การใช้งาน</th>
                <th className="px-6 py-4">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {/* Empty State */}
              <tr>
                <td colSpan={8} className="py-20 text-center">
                  <div className="flex flex-col items-center justify-center text-slate-400">
                    <Users size={48} className="text-slate-300 mb-4" />
                    <p className="font-semibold text-base text-slate-600">ยังไม่มีข้อมูลพนักงาน</p>
                    <p className="text-sm mt-1">คลิกปุ่ม "+ เพิ่มพนักงาน" เพื่อเริ่มต้นเพิ่มข้อมูล</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Pagination Placeholder */}
        <div className="p-4 border-t border-slate-100 flex justify-between items-center text-sm text-slate-500 bg-slate-50/50">
          <span>แสดง 0 - 0 จาก 0 รายการ</span>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 bg-white opacity-50 cursor-not-allowed">{'<'}</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 bg-white opacity-50 cursor-not-allowed">{'>'}</button>
          </div>
        </div>
      </div>

      {/* 4. Bottom Section (3 Column Grid Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: โครงสร้างองค์กร */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-800 text-base mb-6">โครงสร้างองค์กร</h3>
          <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 p-6 text-center text-slate-400 min-h-[350px]">
            <Building2 size={48} className="text-slate-300 mb-4" />
            <p className="font-semibold text-slate-600">ยังไม่มีข้อมูลโครงสร้างองค์กร</p>
            <p className="text-xs mt-2">ระบบจะสร้างผังองค์กรอัตโนมัติ<br/>เมื่อมีการเพิ่มข้อมูลพนักงานและแผนก</p>
          </div>
        </div>

        {/* Right Col (Spans 2): ข้อมูลแผนก + ภาระงาน + คู่มือ */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* ข้อมูลแผนก Table */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 text-base mb-4">ข้อมูลแผนก</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-center text-sm">
                <thead className="bg-slate-50 text-slate-500 text-xs font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left">แผนก</th>
                    <th className="px-4 py-3 text-left">หัวหน้าแผนก</th>
                    <th className="px-4 py-3">จำนวนสมาชิก</th>
                    <th className="px-4 py-3 text-left">ภาระงานเฉลี่ย</th>
                    <th className="px-4 py-3">SLA ที่รับผิดชอบ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={5} className="py-12 text-slate-400 border-b border-slate-100 border-dashed">
                      ไม่มีข้อมูลแผนก
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ภาระงาน & คู่มือ (แบ่งครึ่งอีกที) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
            
            {/* ภาพรวมภาระงาน (Pie Chart Placeholder) */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
              <h3 className="font-bold text-slate-800 text-base mb-6">ภาพรวมภาระงาน</h3>
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                <PieChart size={64} className="text-slate-200 mb-4" />
                <p className="font-medium">ไม่มีข้อมูลภาพรวมภาระงาน</p>
              </div>
            </div>

            {/* วิธีการใช้งาน (Guide) */}
            <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm bg-gradient-to-b from-blue-50/50 to-white">
              <h3 className="font-bold text-blue-800 text-base mb-6 flex items-center gap-2">
                <Info size={18} /> วิธีการใช้งาน
              </h3>
              <div className="space-y-5 text-sm">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold shrink-0">1</div>
                  <div>
                    <p className="font-bold text-slate-700">เพิ่มพนักงานใหม่</p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">คลิกปุ่ม "+ เพิ่มพนักงาน" กรอกข้อมูลพื้นฐาน กำหนดแผนกและสิทธิ์การใช้งาน</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold shrink-0">2</div>
                  <div>
                    <p className="font-bold text-slate-700">กำหนดแผนก</p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">เลือกแผนกหลักให้พนักงาน เพื่อให้ระบบมอบหมายงานตามความเชี่ยวชาญ</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold shrink-0">3</div>
                  <div>
                    <p className="font-bold text-slate-700">จัดการสิทธิ์การใช้งาน</p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">กำหนดบทบาทและสิทธิ์การเข้าถึงระบบ เพื่อความปลอดภัยของข้อมูล</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}