"use client";
import React from "react";
import { Search, Plus, Calendar, RefreshCcw, ClipboardList, CheckCircle, Clock, AlertTriangle } from "lucide-react";

export default function TasksPage() {
  return (
    <div className="flex flex-col xl:flex-row gap-6 animate-in fade-in duration-500">
      {/* ฝั่งซ้าย: เนื้อหาหลัก */}
      <div className="flex-1 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">งานทั้งหมด</h1>
            <p className="text-sm text-slate-500 mt-1">จัดการและติดตามเคสทั้งหมดในระบบ</p>
          </div>
          <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 flex items-center gap-2 shadow-sm">
            <Plus size={18} /> สร้างเคสใหม่
          </button>
        </div>

        {/* 5 Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { title: "เคสทั้งหมด", value: "0", color: "text-blue-600" },
            { title: "กำลังดำเนินการ", value: "0", color: "text-green-600" },
            { title: "ใกล้ครบกำหนด", value: "0", color: "text-amber-500" },
            { title: "เกินกำหนด", value: "0", color: "text-red-500" },
            { title: "ปิดงานแล้ว", value: "0", color: "text-teal-600" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
              <p className={`text-xs font-bold mb-2 ${stat.color}`}>{stat.title}</p>
              <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
              <p className="text-[10px] text-slate-400 mt-1">เคส</p>
            </div>
          ))}
        </div>

        {/* ตัวกรอง */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="ค้นหา Case No, ลูกค้า, ผู้รับผิดชอบ..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select className="p-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 focus:outline-none focus:border-blue-500"><option>สถานะทั้งหมด</option></select>
            <select className="p-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 focus:outline-none focus:border-blue-500"><option>ประเภทบริการทั้งหมด</option></select>
            <select className="p-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 focus:outline-none focus:border-blue-500"><option>ลูกค้าทั้งหมด</option></select>
            <select className="p-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 focus:outline-none focus:border-blue-500"><option>แผนกทั้งหมด</option></select>
            <select className="p-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 focus:outline-none focus:border-blue-500"><option>ผู้รับผิดชอบทั้งหมด</option></select>
            <div className="md:col-span-2 flex items-center gap-2">
              <input type="date" className="p-2.5 rounded-xl border border-slate-200 text-sm w-full text-slate-600" />
              <span className="text-slate-400">-</span>
              <input type="date" className="p-2.5 rounded-xl border border-slate-200 text-sm w-full text-slate-600" />
            </div>
            <div className="flex gap-2">
              <button className="flex-1 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50 flex items-center justify-center gap-2"><RefreshCcw size={16}/> ล้างตัวกรอง</button>
              <button className="flex-1 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 shadow-sm flex items-center justify-center gap-2"><Search size={16}/> ค้นหา</button>
            </div>
          </div>
        </div>

        {/* ตาราง */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-blue-600 text-xs font-bold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Case No</th>
                  <th className="px-6 py-4">ลูกค้า</th>
                  <th className="px-6 py-4">ประเภทบริการ</th>
                  <th className="px-6 py-4">ประเทศ</th>
                  <th className="px-6 py-4">วันที่เปิดเคส</th>
                  <th className="px-6 py-4">วันครบกำหนด</th>
                  <th className="px-6 py-4">แผนกปัจจุบัน</th>
                  <th className="px-6 py-4">ผู้รับผิดชอบ</th>
                  <th className="px-6 py-4">สถานะ</th>
                  <th className="px-6 py-4">Progress</th>
                </tr>
              </thead>
              <tbody>
                <tr><td colSpan={10} className="px-6 py-20 text-center text-slate-400 font-medium">ไม่พบข้อมูล</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ฝั่งขวา: Sidebar คู่มือ */}
      <div className="w-full xl:w-72 space-y-4">
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
          <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2"> วิธีการใช้งาน</h3>
          <ul className="space-y-4 text-sm text-blue-900">
            <li className="flex items-start gap-2"><b>1.</b> การค้นหาและกรองข้อมูลใช้ช่องด้านบน</li>
            <li className="flex items-start gap-2"><b>2.</b> เปิดดูรายละเอียดคลิกที่ Case No</li>
            <li className="flex items-start gap-2"><b>3.</b> อัปเดตสถานะทำได้ในหน้ารายละเอียด</li>
          </ul>
        </div>
      </div>
    </div>
  );
}