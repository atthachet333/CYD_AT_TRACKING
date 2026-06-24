"use client";
import React, { useEffect, useState } from "react";
import { ClipboardList, CheckCircle, Clock, AlertTriangle, ChevronRight, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { fetchDashboardData } from "../../lib/services/googleSheetApi";
import type { DashboardSummary } from "../../types";

const emptyDashboardSummary: DashboardSummary = {
  totalCases: 0,
  closedCases: 0,
  inProgressCases: 0,
  urgentCases: 0,
  missingDocumentCases: 0,
  nearDueCases: 0,
  overdueCases: 0,
};

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary>(emptyDashboardSummary);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    async function loadDashboard() {
      try {
        setIsLoading(true);
        const data = await fetchDashboardData();

        if (isActive) {
          setSummary(data);
        }
      } catch {
        if (isActive) {
          setSummary(emptyDashboardSummary);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 5 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { title: "เคสทั้งหมด", value: String(summary.totalCases), icon: <ClipboardList size={24}/>, color: "text-blue-600", bg: "bg-blue-600", link: "/dashboard/tasks" },
          { title: "กำลังดำเนินการ", value: String(summary.inProgressCases), icon: <CheckCircle size={24}/>, color: "text-green-600", bg: "bg-green-600", link: "/dashboard/tasks" },
          { title: "ใกล้ครบกำหนด", value: String(summary.nearDueCases), icon: <Clock size={24}/>, color: "text-amber-500", bg: "bg-amber-500", link: "/dashboard/near-due" },
          { title: "เกินกำหนด", value: String(summary.overdueCases), icon: <AlertTriangle size={24}/>, color: "text-red-500", bg: "bg-red-500", link: "/dashboard/overdue", border: "border-red-200" },
          { title: "ปิดงานแล้ว", value: String(summary.closedCases), icon: <CheckCircle size={24}/>, color: "text-teal-600", bg: "bg-teal-600", link: "/dashboard/closed" },
        ].map((stat, i) => (
          <div key={i} className={`bg-white rounded-2xl border ${stat.border || 'border-slate-200'} shadow-sm flex flex-col hover:-translate-y-1 transition-all`}>
            <div className="p-5 flex-1 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className={`${stat.bg} text-white p-1.5 rounded-lg`}>{stat.icon}</div>
                <p className={`text-sm font-bold ${stat.color}`}>{stat.title}</p>
              </div>
              <div className="flex items-baseline justify-center gap-1">
                <span className={`text-5xl font-black ${stat.color}`}>{stat.value}</span>
                <span className="text-sm font-semibold text-slate-400">เคส</span>
              </div>
            </div>
            <Link href={stat.link} className="bg-slate-50 border-t border-slate-100 py-2.5 flex items-center justify-center text-xs font-semibold text-blue-600 hover:bg-blue-50">
              ดูทั้งหมด <ChevronRight size={14} className="ml-1" />
            </Link>
          </div>
        ))}
      </div>

      {/* กราฟ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
          <h3 className="text-lg font-bold text-slate-800 w-full mb-4">สัดส่วนตามประเภทบริการ</h3>
          <div className="w-40 h-40 rounded-full border-[16px] border-slate-100 flex items-center justify-center">
            <span className="text-slate-400 font-medium">0%</span>
          </div>
          <p className="text-slate-400 text-sm mt-4">{isLoading ? "กำลังโหลดข้อมูล..." : "ไม่มีข้อมูล"}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col min-h-[300px]">
          <h3 className="text-lg font-bold text-slate-800 mb-6">สถานะงานตามแผนก</h3>
          <div className="flex-1 flex items-center justify-center text-slate-400 text-sm border-l border-b border-slate-100">
            ไม่มีข้อมูล
          </div>
        </div>
      </div>

      {/* ตารางงานใกล้ครบกำหนด */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">งานใกล้ครบกำหนด (ภายใน 7 วัน)</h3>
          <Link href="/dashboard/near-due" className="text-sm text-blue-600 font-medium flex items-center hover:underline">ดูทั้งหมด <ChevronRight size={16}/></Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50/80 text-slate-500 text-xs uppercase border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Case No</th>
                <th className="px-6 py-4">ลูกค้า</th>
                <th className="px-6 py-4">ประเภทบริการ</th>
                <th className="px-6 py-4">วันครบกำหนด</th>
                <th className="px-6 py-4">แผนกปัจจุบัน</th>
                <th className="px-6 py-4">ผู้รับผิดชอบ</th>
              </tr>
            </thead>
            <tbody>
              <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400">ยังไม่มีข้อมูลเคส</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
