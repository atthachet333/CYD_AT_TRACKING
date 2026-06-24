"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Users, UserCheck, Activity, CalendarOff, Search, Plus } from "lucide-react";

type StaffItem = {
  name: string;
  department: string;
  position: string;
  activeCases: number;
  status: string;
  role: string;
};

export default function StaffPage() {
  const [activeTab, setActiveTab] = useState("staff");
  const [items, setItems] = useState<StaffItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function loadItems() {
      try {
        const response = await fetch("/api/staff", { cache: "no-store" });
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

  const highLoad = useMemo(() => items.filter((item) => item.activeCases >= 3).length, [items]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold text-slate-800">พนักงาน / แผนก</h1>
      
      {/* Tabs */}
      <div className="flex gap-6 border-b border-slate-200">
        <button onClick={() => setActiveTab("staff")} className={`pb-3 text-sm font-bold border-b-2 transition-all ${activeTab === 'staff' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`}>พนักงาน</button>
        <button onClick={() => setActiveTab("dept")} className={`pb-3 text-sm font-bold border-b-2 transition-all ${activeTab === 'dept' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`}>แผนก</button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "พนักงานทั้งหมด", value: String(items.length), color: "text-blue-600", bg: "bg-blue-100", icon: <Users size={20}/> },
          { title: "พนักงานออนไลน์", value: String(items.length), color: "text-green-600", bg: "bg-green-100", icon: <UserCheck size={20}/> },
          { title: "ภาระงานสูง", value: String(highLoad), color: "text-orange-500", bg: "bg-orange-100", icon: <Activity size={20}/> },
          { title: "ลางานวันนี้", value: "0", color: "text-red-500", bg: "bg-red-100", icon: <CalendarOff size={20}/> },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center hover:-translate-y-1 transition-transform">
            <div className={`flex items-center gap-2 mb-2 ${stat.color} font-bold text-sm`}><div className={`p-1.5 rounded-full ${stat.bg}`}>{stat.icon}</div> {stat.title}</div>
            <p className={`text-4xl font-black ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex flex-wrap justify-between items-center gap-4">
              <h3 className="font-bold text-slate-800 text-sm">รายชื่อพนักงาน</h3>
              <div className="flex gap-2">
                <div className="bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 text-xs flex items-center gap-2"><Search size={14}/> ค้นหา...</div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1"><Plus size={14}/> เพิ่มพนักงาน</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-center text-sm">
                <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase font-bold border-b border-slate-200">
                  <tr><th className="px-4 py-3 text-left">ชื่อพนักงาน</th><th className="px-4 py-3">แผนก</th><th className="px-4 py-3">ตำแหน่ง</th><th className="px-4 py-3">สถานะ</th><th className="px-4 py-3">สิทธิ์การใช้งาน</th></tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr><td colSpan={5} className="py-12 text-slate-400">กำลังโหลดข้อมูล...</td></tr>
                  ) : items.length > 0 ? (
                    items.map((item) => (
                      <tr key={item.name} className="border-b border-slate-100 text-slate-600 hover:bg-slate-50">
                        <td className="px-4 py-3 text-left font-bold text-blue-600">{item.name}</td>
                        <td className="px-4 py-3">{item.department}</td>
                        <td className="px-4 py-3">{item.position}</td>
                        <td className="px-4 py-3">{item.status}</td>
                        <td className="px-4 py-3">{item.role}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={5} className="py-12 text-slate-400">ยังไม่มีข้อมูลพนักงาน</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[300px] flex items-center justify-center text-slate-400 border-dashed border-2">
            <p>โครงสร้างองค์กร (Org Chart)</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[250px] flex items-center justify-center text-slate-400 border-dashed border-2">
            <p>ภาพรวมภาระงาน (Pie Chart)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
