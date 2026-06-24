"use client";
import React, { useEffect, useState } from "react";
// เพิ่ม Search เข้ามาในบรรทัดนี้แล้วครับ
import { Briefcase, CheckCircle, PauseCircle, FileText, Plus, Search } from "lucide-react";

export default function ServicesPage() {
  const [items, setItems] = useState<Array<{ serviceCode: string; serviceName: string; sla: string; departments: string; status: string; caseCount: number }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function loadItems() {
      try {
        const response = await fetch("/api/services", { cache: "no-store" });
        const payload = await response.json();
        if (active) setItems(response.ok && Array.isArray(payload.data) ? payload.data : []);
      } catch {
        if (active) setItems([]);
      } finally {
        if (active) setIsLoading(false);
      }
    }
    loadItems();
    return () => { active = false; };
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-2"><span>Dashboard</span> <span className="text-slate-300">{'>'}</span> <span className="text-blue-600 font-medium">ประเภทบริการ</span></div>
          <h1 className="text-3xl font-bold text-slate-800">ประเภทบริการ</h1>
          <p className="text-sm text-slate-500 mt-1">จัดการข้อมูลประเภทบริการทั้งหมดของบริษัท</p>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-md"><Plus size={18}/> เพิ่มประเภทบริการ</button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "ประเภทบริการทั้งหมด", value: String(items.length), color: "text-blue-600", bg: "bg-blue-100", icon: <Briefcase size={20}/> },
          { title: "เปิดใช้งาน", value: String(items.length), color: "text-green-600", bg: "bg-green-100", icon: <CheckCircle size={20}/> },
          { title: "ปิดใช้งาน", value: "0", color: "text-amber-500", bg: "bg-amber-100", icon: <PauseCircle size={20}/> },
          { title: "เอกสารทั้งหมด", value: "0", color: "text-slate-600", bg: "bg-slate-100", icon: <FileText size={20}/> },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:-translate-y-1 transition-transform">
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>{stat.icon}</div>
            <div><p className={`text-sm font-bold ${stat.color} mb-1`}>{stat.title}</p><p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 text-sm">รายการประเภทบริการ</h3>
              <div className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-500 flex items-center gap-2"><Search size={14}/> ค้นหา...</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-center text-sm whitespace-nowrap">
                <thead className="bg-white text-slate-500 text-[11px] uppercase font-bold border-b border-slate-200">
                  <tr><th className="px-4 py-3">รหัสบริการ</th><th className="px-4 py-3 text-left">ชื่อบริการ</th><th className="px-4 py-3">SLA</th><th className="px-4 py-3">แผนก</th><th className="px-4 py-3">สถานะ</th><th className="px-4 py-3">จัดการ</th></tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr><td colSpan={6} className="py-12 text-slate-400">กำลังโหลดข้อมูล...</td></tr>
                  ) : items.length > 0 ? (
                    items.map((item) => (
                      <tr key={item.serviceCode} className="border-b border-slate-100 text-slate-600 hover:bg-slate-50">
                        <td className="px-4 py-3">{item.serviceCode}</td>
                        <td className="px-4 py-3 text-left font-bold text-blue-600">{item.serviceName}</td>
                        <td className="px-4 py-3">{item.sla}</td>
                        <td className="px-4 py-3">{item.departments}</td>
                        <td className="px-4 py-3">{item.status}</td>
                        <td className="px-4 py-3">{item.caseCount} เคส</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={6} className="py-12 text-slate-400">ยังไม่มีข้อมูลประเภทบริการ</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[250px] flex items-center justify-center text-slate-400 border-dashed border-2"><p>ความนิยมของประเภทบริการ (กราฟแท่ง)</p></div>
             <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[250px] flex items-center justify-center text-slate-400 border-dashed border-2"><p>เอกสารที่ต้องใช้ทั้งหมด (Summary)</p></div>
          </div>
        </div>

        {/* Right Sidebar: Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <h3 className="font-bold text-blue-700 text-base border-b border-slate-100 pb-3">เพิ่ม / แก้ไขประเภทบริการ</h3>
          <div className="space-y-4">
             <div><label className="text-xs font-bold text-slate-700 block mb-1">รหัสบริการ *</label><input type="text" className="w-full p-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50" disabled /></div>
             <div><label className="text-xs font-bold text-slate-700 block mb-1">ชื่อบริการ *</label><input type="text" className="w-full p-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50" disabled /></div>
             <div><label className="text-xs font-bold text-slate-700 block mb-1">ระยะเวลา SLA *</label><input type="text" className="w-full p-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50" disabled /></div>
             <div><label className="text-xs font-bold text-slate-700 block mb-1">สถานะ</label>
                <div className="flex gap-4 mt-2">
                   <label className="flex items-center gap-2 text-sm text-slate-600"><input type="radio" disabled/> เปิดใช้งาน</label>
                   <label className="flex items-center gap-2 text-sm text-slate-600"><input type="radio" disabled/> ปิดใช้งาน</label>
                </div>
             </div>
             <div className="pt-4 flex gap-3">
                <button className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-sm font-bold opacity-50 cursor-not-allowed">บันทึก</button>
                <button className="flex-1 border border-slate-200 text-slate-600 py-2.5 rounded-xl text-sm font-bold opacity-50 cursor-not-allowed">ยกเลิก</button>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
