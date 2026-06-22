"use client";
import React from "react";
import { CheckCircle, Clock, AlertCircle, Star, CalendarDays, Download, Search, FileText, Upload } from "lucide-react";

export default function ClosedPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">ปิดงานแล้ว</h1>
        <p className="text-sm text-slate-500 mt-1">สรุปงานที่ดำเนินการเสร็จสิ้นทั้งหมด</p>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "ปิดงานเดือนนี้", value: "0", sub: "0.0%", trend: "0.0%", trendUp: true, color: "text-blue-600", bg: "bg-blue-600", icon: <CheckCircle size={24}/> },
          { title: "ปิดตรงเวลา", value: "0", sub: "(0.0%)", trend: "0.0%", trendUp: true, color: "text-green-600", bg: "bg-green-600", icon: <CheckCircle size={24}/> },
          { title: "ปิดล่าช้า", value: "0", sub: "(0.0%)", trend: "0.0%", trendUp: false, color: "text-red-600", bg: "bg-red-600", icon: <Clock size={24}/> },
          { title: "คะแนนความพึงพอใจ", value: "0.00", sub: "จาก 5.00", trend: "0.00", trendUp: true, color: "text-blue-600", bg: "bg-blue-600", icon: <Star size={24}/> },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col hover:-translate-y-1 transition-transform">
            <div className="flex items-center gap-3 mb-4">
              <div className={`${stat.bg} text-white p-2 rounded-xl shadow-sm`}>{stat.icon}</div>
              <p className={`font-bold text-sm ${stat.color}`}>{stat.title}</p>
            </div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className={`text-4xl font-black ${stat.color}`}>{stat.value}</span>
              <span className="text-sm font-semibold text-slate-400">{stat.title === "ปิดงานเดือนนี้" ? "เคส" : stat.sub}</span>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-[11px] font-semibold text-slate-400">
              <span>เทียบกับเดือนก่อน</span>
              <span className={`flex items-center ${stat.trendUp ? 'text-green-500' : 'text-red-500'}`}>
                {stat.trendUp ? '▲' : '▼'} {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Row */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1.5">
            <label className="text-[12px] font-bold text-slate-700">ช่วงวันที่ปิดงาน</label>
            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="วว/ดด/ปปปป - วว/ดด/ปปปป" className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 text-slate-500" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[12px] font-bold text-slate-700">ลูกค้า</label>
            <select className="w-full p-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 focus:outline-none"><option>ทั้งหมด</option></select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[12px] font-bold text-slate-700">ประเภทบริการ</label>
            <select className="w-full p-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 focus:outline-none"><option>ทั้งหมด</option></select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[12px] font-bold text-slate-700">ผู้ปิดงาน / เจ้าของงาน</label>
            <select className="w-full p-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 focus:outline-none"><option>ทั้งหมด</option></select>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button className="border border-green-600 text-green-600 px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-green-50 transition-colors"><Download size={16}/> ส่งออก Excel</button>
          <button className="border border-red-600 text-red-600 px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-red-50 transition-colors"><FileText size={16}/> ส่งออก PDF</button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-bold text-slate-800 text-sm">รายการงานที่ปิดแล้ว</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-center text-sm whitespace-nowrap">
            <thead className="bg-white text-slate-500 text-xs font-bold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left">Case No</th>
                <th className="px-6 py-4 text-left">ลูกค้า</th>
                <th className="px-6 py-4 text-left">ประเภทบริการ</th>
                <th className="px-6 py-4">วันที่เปิด</th>
                <th className="px-6 py-4">วันที่ปิด</th>
                <th className="px-6 py-4">ระยะเวลาดำเนินการ</th>
                <th className="px-6 py-4">ผู้ปิดงาน</th>
                <th className="px-6 py-4">ผลลัพธ์</th>
                <th className="px-6 py-4">เอกสารสรุป</th>
              </tr>
            </thead>
            <tbody>
              <tr><td colSpan={9} className="px-6 py-16 text-slate-400 font-medium">ยังไม่มีข้อมูลการปิดงาน</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center min-h-[350px]">
          <h3 className="w-full font-bold text-slate-800 text-sm mb-6">แนวโน้มการปิดงานสำเร็จ (6 เดือนล่าสุด)</h3>
          <div className="flex-1 w-full flex items-end justify-between px-4 border-b border-slate-200 pb-4">
             {/* กราฟแท่งเปล่า */}
             {[1,2,3,4,5,6].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                   <div className="w-10 h-4 bg-slate-100 rounded-t-sm"></div>
                   <span className="text-[10px] text-slate-400 font-medium">เดือน {i+1}</span>
                </div>
             ))}
          </div>
          <div className="flex gap-4 mt-4 text-[11px] font-bold text-slate-500">
            <span className="flex items-center gap-1.5"><div className="w-3 h-3 bg-blue-500 rounded-sm"></div> ปิดงานสำเร็จ (เคส)</span>
          </div>
        </div>

        {/* Ratings Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="w-full font-bold text-slate-800 text-sm mb-6">คะแนนความพึงพอใจจากลูกค้า</h3>
          <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-10">
            {/* วงกลมคะแนน */}
            <div className="w-32 h-32 rounded-full border-[12px] border-slate-100 flex flex-col items-center justify-center">
               <span className="text-3xl font-black text-slate-300">0.0</span>
               <span className="text-[10px] font-bold text-slate-400">จาก 5.00</span>
            </div>
            {/* หลอดคะแนน 5 ดาว */}
            <div className="flex-1 w-full space-y-2.5">
               {[
                 { star: 5, val: "0" }, { star: 4, val: "0" }, { star: 3, val: "0" }, { star: 2, val: "0" }, { star: 1, val: "0" }
               ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-[11px] font-bold text-slate-500">
                    <span className="w-4 text-right">{item.star} <Star size={10} className="inline text-slate-300"/></span>
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden"></div>
                    <span className="w-6">{item.val}</span>
                  </div>
               ))}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 text-right">
             <span className="text-sm font-bold text-slate-400">คะแนนเฉลี่ยรวม 0.00 / 5.00</span>
          </div>
        </div>
      </div>

      {/* Guidelines (Bottom Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
           <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><CheckCircle size={20}/></div>
           <div>
              <h4 className="font-bold text-slate-700 text-sm mb-1">ตรวจสอบงานที่ปิดแล้ว</h4>
              <p className="text-xs text-slate-500 leading-relaxed">ดูรายละเอียดและผลลัพธ์การดำเนินการทั้งหมด</p>
           </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
           <div className="p-3 bg-slate-50 text-slate-600 rounded-xl"><FileText size={20}/></div>
           <div>
              <h4 className="font-bold text-slate-700 text-sm mb-1">เปิดเอกสารสรุปงาน</h4>
              <p className="text-xs text-slate-500 leading-relaxed">คลิกไอคอนเอกสาร เพื่อดูสรุปผลการดำเนินงานและเอกสารแนบ</p>
           </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
           <div className="p-3 bg-green-50 text-green-600 rounded-xl"><Upload size={20}/></div>
           <div>
              <h4 className="font-bold text-slate-700 text-sm mb-1">ส่งออกข้อมูล</h4>
              <p className="text-xs text-slate-500 leading-relaxed">ส่งออกข้อมูลรายงานเป็นไฟล์ Excel หรือ PDF เพื่อนำไปใช้งาน</p>
           </div>
        </div>
      </div>

    </div>
  );
}