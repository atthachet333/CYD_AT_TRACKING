"use client";
import React, { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Search, Download, RefreshCcw, Eye, Edit, Trash2 } from "lucide-react";

type OverdueItem = {
  caseId: string;
  customer: string;
  workType: string;
  dueDate: string;
  overdueDays: number;
  reason: string;
  assignee: string;
  risk: string;
  department: string;
};

export default function OverduePage() {
  const [items, setItems] = useState<OverdueItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function loadItems() {
      try {
        const response = await fetch("/api/jobs/overdue", { cache: "no-store" });
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

  const stats = useMemo(() => {
    const total = items.length || 1;
    const oneToThree = items.filter((item) => item.overdueDays >= 1 && item.overdueDays <= 3).length;
    const fourToSeven = items.filter((item) => item.overdueDays >= 4 && item.overdueDays <= 7).length;
    const moreThanSeven = items.filter((item) => item.overdueDays > 7).length;
    const highRisk = items.filter((item) => item.risk === "High").length;
    const percent = (count: number) => `${((count / total) * 100).toFixed(1)}%`;
    return { oneToThree, fourToSeven, moreThanSeven, highRisk, percent };
  }, [items]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <AlertTriangle size={28} className="text-red-600" />
        <h1 className="text-3xl font-bold text-red-600">งานเกินกำหนด</h1>
      </div>
      <p className="text-sm text-slate-500">ภาพรวมงานที่เกินกำหนดและแนวทางการจัดการเพื่อเร่งรัดการดำเนินการ</p>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: "เกิน 1-3 วัน", value: String(stats.oneToThree), percent: stats.percent(stats.oneToThree), emoji: "📅" },
          { title: "เกิน 4-7 วัน", value: String(stats.fourToSeven), percent: stats.percent(stats.fourToSeven), emoji: "📆" },
          { title: "เกิน 7 วัน", value: String(stats.moreThanSeven), percent: stats.percent(stats.moreThanSeven), emoji: "🗓️" },
          { title: "เสี่ยงสูง", value: String(stats.highRisk), percent: stats.percent(stats.highRisk), emoji: "⚠️", border: "border-red-200 shadow-red-50" },
        ].map((stat, i) => (
          <div key={i} className={`bg-white p-5 rounded-2xl border ${stat.border || 'border-slate-200'} shadow-sm text-center`}>
            <p className="text-sm font-bold mb-2 text-red-600 flex items-center justify-center gap-1.5">
              {stat.emoji} {stat.title}
            </p>
            <p className="text-4xl font-black text-red-600">{stat.value}</p>
            <p className="text-xs font-bold text-slate-400 mt-1">เคส</p>
            <div className="mt-3 text-[11px] font-bold text-red-500">{stat.percent} ของงานเกินกำหนด</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart Placeholder */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center">
          <h3 className="w-full text-sm font-bold text-slate-800 mb-6">สาเหตุของงานเกินกำหนด</h3>
          <div className="w-40 h-40 rounded-full border-[16px] border-slate-100 flex items-center justify-center text-slate-300 font-bold">
            {items.length}<br/>เคส
          </div>
        </div>
        
        {/* Bar Chart Placeholder */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center">
          <h3 className="w-full text-sm font-bold text-slate-800 mb-6">งานเกินกำหนดแยกตามแผนก</h3>
          <div className="flex-1 w-full border-l border-b border-slate-100 flex items-center justify-center text-slate-400 text-sm">
            {items.length > 0 ? `${items.length} เคส` : "ไม่มีข้อมูล"}
          </div>
        </div>

        {/* Guidelines */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 mb-4">แนวทางการจัดการงานเกินกำหนด</h3>
          <div className="space-y-4 text-sm">
            <div className="flex gap-3"><div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs shrink-0"><Search size={12}/></div><div><p className="font-bold text-slate-700">1. ตรวจสอบสาเหตุ</p><p className="text-[11px] text-slate-500">วิเคราะห์สาเหตุของการเกินกำหนดและผลกระทบ</p></div></div>
            <div className="flex gap-3"><div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs shrink-0">👥</div><div><p className="font-bold text-slate-700">2. ประสานงานผู้เกี่ยวข้อง</p><p className="text-[11px] text-slate-500">ติดต่อผู้รับผิดชอบหรือลูกค้าเพื่ออัปเดต</p></div></div>
            <div className="flex gap-3"><div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xs shrink-0">⏱️</div><div><p className="font-bold text-slate-700">3. กำหนดแผนเร่งรัด</p><p className="text-[11px] text-slate-500">วางแผนการดำเนินงานและกำหนดวันที่แล้วเสร็จใหม่</p></div></div>
            <div className="flex gap-3"><div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xs shrink-0">✅</div><div><p className="font-bold text-slate-700">4. ติดตามผลต่อเนื่อง</p><p className="text-[11px] text-slate-500">ติดตามความคืบหน้าอย่างสม่ำเสมอจนกว่าจะปิดงาน</p></div></div>
          </div>
        </div>
      </div>

      {/* Table Filter */}
      <div className="bg-white p-5 rounded-t-2xl border-x border-t border-slate-200 shadow-sm flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input type="text" placeholder="ค้นหา Case No, ลูกค้า..." className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none" />
        </div>
        <div className="flex gap-3">
          <select className="px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-600"><option>แผนกทั้งหมด</option></select>
          <select className="px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-600"><option>สาเหตุทั้งหมด</option></select>
          <select className="px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-600"><option>ระดับความเสี่ยง</option></select>
          <button className="text-slate-500 flex items-center gap-1 text-xs hover:text-slate-800"><RefreshCcw size={14}/> ล้างตัวกรอง</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-blue-700"><Download size={14}/> ส่งออกข้อมูล</button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-b-2xl border border-slate-200 shadow-sm overflow-hidden -mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-center text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase font-bold border-y border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left">Case No</th>
                <th className="px-4 py-3 text-left">ลูกค้า</th>
                <th className="px-4 py-3 text-left">ประเภทบริการ</th>
                <th className="px-4 py-3">วันครบกำหนดเดิม</th>
                <th className="px-4 py-3">จำนวนวันที่เกิน</th>
                <th className="px-4 py-3 text-left">สาเหตุ</th>
                <th className="px-4 py-3">ผู้รับผิดชอบ</th>
                <th className="px-4 py-3">ระดับความเสี่ยง</th>
                <th className="px-4 py-3">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={9} className="px-6 py-12 text-slate-400">กำลังโหลดข้อมูล...</td></tr>
              ) : items.length > 0 ? (
                items.map((item) => (
                  <tr key={item.caseId} className="border-b border-slate-100 text-slate-600 hover:bg-slate-50">
                    <td className="px-4 py-3 text-left font-bold text-red-600">{item.caseId}</td>
                    <td className="px-4 py-3 text-left">{item.customer}</td>
                    <td className="px-4 py-3 text-left">{item.workType}</td>
                    <td className="px-4 py-3">{item.dueDate}</td>
                    <td className="px-4 py-3">{item.overdueDays}</td>
                    <td className="px-4 py-3 text-left">{item.reason}</td>
                    <td className="px-4 py-3">{item.assignee}</td>
                    <td className="px-4 py-3">{item.risk}</td>
                    <td className="px-4 py-3">ติดตาม</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={9} className="px-6 py-12 text-slate-400">ยังไม่มีข้อมูล</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4 Action Cards ด้านล่าง */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2"><div className="p-1.5 bg-red-100 text-red-600 rounded-lg"><AlertTriangle size={18}/></div><h4 className="font-bold text-red-600 text-sm">เร่งติดตามทั้งหมด</h4></div>
            <p className="text-[11px] text-slate-500 mb-4">ส่งการแจ้งเตือนไปยังผู้รับผิดชอบทุกเคสที่เกินกำหนด</p>
          </div>
          <button className="w-full bg-red-600 text-white py-2 rounded-xl text-sm font-bold hover:bg-red-700">เร่งติดตาม</button>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2"><div className="p-1.5 bg-orange-100 text-orange-600 rounded-lg">📅</div><h4 className="font-bold text-orange-600 text-sm">ขยายกำหนดหลายรายการ</h4></div>
            <p className="text-[11px] text-slate-500 mb-4">ขออนุมัติขยายกำหนดสำหรับหลายรายการพร้อมกัน</p>
          </div>
          <button className="w-full bg-orange-500 text-white py-2 rounded-xl text-sm font-bold hover:bg-orange-600">ขยายกำหนด</button>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2"><div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">👤</div><h4 className="font-bold text-blue-600 text-sm">มอบหมายงานใหม่</h4></div>
            <p className="text-[11px] text-slate-500 mb-4">มอบหมายงานเกินกำหนดให้ผู้รับผิดชอบคนใหม่</p>
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded-xl text-sm font-bold hover:bg-blue-700">มอบหมาย</button>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2"><div className="p-1.5 bg-green-100 text-green-600 rounded-lg">📊</div><h4 className="font-bold text-green-600 text-sm">รายงานงานเกินกำหนด</h4></div>
            <p className="text-[11px] text-slate-500 mb-4">ดาวน์โหลดรายงานงานเกินกำหนดในรูปแบบ Excel</p>
          </div>
          <button className="w-full bg-green-600 text-white py-2 rounded-xl text-sm font-bold hover:bg-green-700">ดาวน์โหลด</button>
        </div>
      </div>

    </div>
  );
}
