"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Search, CalendarDays } from "lucide-react";

type NearDueItem = {
  caseId: string;
  customer: string;
  workType: string;
  dueDate: string;
  remainingDays: number | null;
  department: string;
  assignee: string;
  status: string;
  priority: string;
};

export default function NearDuePage() {
  const [items, setItems] = useState<NearDueItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadItems() {
      try {
        setIsLoading(true);
        setError("");
        const response = await fetch("/api/jobs/near-due", { cache: "no-store" });
        const payload = await response.json();
        if (active) setItems(response.ok && Array.isArray(payload.data) ? payload.data : []);
      } catch {
        if (active) {
          setItems([]);
          setError("ไม่สามารถโหลดข้อมูลงานใกล้ครบกำหนดได้");
        }
      } finally {
        if (active) setIsLoading(false);
      }
    }

    loadItems();
    return () => {
      active = false;
    };
  }, []);

  const stats = useMemo(() => ({
    oneDay: items.filter((item) => (item.remainingDays ?? 99) <= 1).length,
    threeDays: items.filter((item) => (item.remainingDays ?? 99) <= 3).length,
    sevenDays: items.length,
    urgent: items.filter((item) => item.priority.toUpperCase() === "HIGH" || (item.remainingDays ?? 99) <= 1).length,
  }), [items]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">งานใกล้ครบกำหนด</h1>
        <p className="text-sm text-slate-500 mt-1">ติดตามงานและเคสที่ครบกำหนดภายในเร็วๆ นี้</p>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "ครบภายใน 1 วัน", value: String(stats.oneDay), color: "text-blue-600" },
          { title: "ครบภายใน 3 วัน", value: String(stats.threeDays), color: "text-green-600" },
          { title: "ครบภายใน 7 วัน", value: String(stats.sevenDays), color: "text-amber-500" },
          { title: "ต้องเร่งติดตาม", value: String(stats.urgent), color: "text-red-500", border: "border-red-200" },
        ].map((stat, i) => (
          <div key={i} className={`bg-white p-6 rounded-2xl border ${stat.border || 'border-slate-200'} shadow-sm text-center`}>
            <p className={`text-sm font-bold mb-3 ${stat.color}`}>{stat.title}</p>
            <p className={`text-5xl font-black ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-slate-400 mt-1.5 font-medium">เคส</p>
          </div>
        ))}
      </div>

      {/* 🔥 Filter Section (เป๊ะตามรูปที่ 1) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
        {/* แถวที่ 1: ค้นหา + Dropdowns */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="space-y-1.5 lg:col-span-1">
            <label className="text-[13px] font-bold text-slate-700">ค้นหา</label>
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="ค้นหา Case No, ลูกค้า, งาน..." className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-slate-700">ประเภทบริการ</label>
            <select className="w-full p-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 focus:outline-none"><option>ทั้งหมด</option></select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-slate-700">แผนก</label>
            <select className="w-full p-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 focus:outline-none"><option>ทั้งหมด</option></select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-slate-700">ผู้รับผิดชอบ</label>
            <select className="w-full p-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 focus:outline-none"><option>ทั้งหมด</option></select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-slate-700">สถานะงาน</label>
            <select className="w-full p-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 focus:outline-none"><option>ทั้งหมด</option></select>
          </div>
        </div>

        {/* แถวที่ 2: วันครบกำหนด + ช่วงวันที่ + ปุ่มค้นหา */}
        <div className="flex flex-col xl:flex-row justify-between items-end gap-4">
          <div className="flex flex-col lg:flex-row gap-5 w-full xl:w-auto">
            {/* กลุ่มปุ่มวันครบกำหนด */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-slate-700">วันครบกำหนด</label>
              <div className="flex border border-slate-200 rounded-xl overflow-hidden p-1 gap-1">
                <button className="px-4 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg border border-blue-100">ทั้งหมด</button>
                <button className="px-4 py-1.5 text-slate-500 hover:bg-slate-50 text-xs font-medium rounded-lg">ภายใน 1 วัน</button>
                <button className="px-4 py-1.5 text-slate-500 hover:bg-slate-50 text-xs font-medium rounded-lg">ภายใน 3 วัน</button>
                <button className="px-4 py-1.5 text-slate-500 hover:bg-slate-50 text-xs font-medium rounded-lg">ภายใน 7 วัน</button>
                <button className="px-4 py-1.5 text-slate-500 hover:bg-slate-50 text-xs font-medium rounded-lg">มากกว่า 7 วัน</button>
              </div>
            </div>

            {/* ช่วงวันที่ */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-slate-700">ช่วงวันที่</label>
              <div className="flex items-center gap-2">
                <input type="text" placeholder="วว/ดด/ปปปป 📅" className="w-36 px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-500 outline-none" />
                <span className="text-slate-400">-</span>
                <input type="text" placeholder="วว/ดด/ปปปป 📅" className="w-36 px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-500 outline-none" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 w-full xl:w-auto mt-2 xl:mt-0">
            <button className="flex-1 xl:flex-none px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50">ล้างค่า</button>
            <button className="flex-1 xl:flex-none px-8 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 shadow-sm">ค้นหา</button>
          </div>
        </div>
      </div>

      {/* ปฏิทินและกราฟ (Empty State) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[250px] flex flex-col items-center justify-center text-slate-400">
          <CalendarDays size={32} className="text-slate-300 mb-3" />
          <p className="font-medium">ปฏิทินวันครบกำหนด</p>
          <p className="text-xs mt-1">{isLoading ? "กำลังโหลดข้อมูล..." : "(ไม่มีข้อมูลการจองวัน)"}</p>
        </div>
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[250px] flex flex-col items-center justify-center text-slate-400">
          <p className="font-medium text-lg">{items.length > 0 ? `มีเคสใกล้ครบกำหนด ${items.length} เคส` : "ไม่มีการแจ้งเตือนเคสเร่งด่วน"}</p>
        </div>
      </div>

      {/* ตารางงานใกล้ครบกำหนด */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 text-xs font-bold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Case No</th>
                <th className="px-6 py-4">ลูกค้า</th>
                <th className="px-6 py-4">ประเภทบริการ</th>
                <th className="px-6 py-4">วันครบกำหนด</th>
                <th className="px-6 py-4">วันที่เหลือ</th>
                <th className="px-6 py-4">แผนกปัจจุบัน</th>
                <th className="px-6 py-4">ผู้รับผิดชอบ</th>
                <th className="px-6 py-4">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={8} className="px-6 py-16 text-center text-slate-400">กำลังโหลดข้อมูล...</td></tr>
              ) : items.length > 0 ? (
                items.map((item) => (
                  <tr key={item.caseId} className="border-b border-slate-100 text-slate-600 hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-blue-600">{item.caseId}</td>
                    <td className="px-6 py-4">{item.customer}</td>
                    <td className="px-6 py-4">{item.workType}</td>
                    <td className="px-6 py-4">{item.dueDate}</td>
                    <td className="px-6 py-4">{item.remainingDays ?? "-"}</td>
                    <td className="px-6 py-4">{item.department}</td>
                    <td className="px-6 py-4">{item.assignee}</td>
                    <td className="px-6 py-4">{item.status}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={8} className="px-6 py-16 text-center text-slate-400">{error || "ยังไม่มีข้อมูลเคสใกล้ครบกำหนด"}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
