"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Search, Plus, Calendar, RefreshCcw, ClipboardList, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { fetchMasterCases } from "../../../lib/services/googleSheetApi";
import type { MasterCaseRow } from "../../../types";

type UiCase = {
  id: string;
  customer: string;
  workType: string;
  country: string;
  dateCreated: string;
  dueDate: string;
  department: string;
  assignee: string;
  status: string;
  progress: string;
  priority: string;
};

const emptyStats = {
  total: 0,
  inProgress: 0,
  nearDue: 0,
  overdue: 0,
  closed: 0,
};

export default function TasksPage() {
  const [cases, setCases] = useState<UiCase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    async function loadCases() {
      try {
        setIsLoading(true);
        setError("");
        const rows = await fetchMasterCases();

        if (isActive) {
          setCases(rows.map(mapMasterCaseToUiCase));
        }
      } catch {
        if (isActive) {
          setCases([]);
          setError("ไม่สามารถโหลดข้อมูลจาก Google Sheet ได้");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadCases();

    return () => {
      isActive = false;
    };
  }, []);

  const stats = useMemo(() => calculateStats(cases), [cases]);

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
            { title: "เคสทั้งหมด", value: String(stats.total), color: "text-blue-600" },
            { title: "กำลังดำเนินการ", value: String(stats.inProgress), color: "text-green-600" },
            { title: "ใกล้ครบกำหนด", value: String(stats.nearDue), color: "text-amber-500" },
            { title: "เกินกำหนด", value: String(stats.overdue), color: "text-red-500" },
            { title: "ปิดงานแล้ว", value: String(stats.closed), color: "text-teal-600" },
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
            {error && (
              <div className="border-b border-amber-100 bg-amber-50 px-6 py-3 text-sm text-amber-700">
                {error}
              </div>
            )}
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
                {isLoading ? (
                  <tr><td colSpan={10} className="px-6 py-20 text-center text-slate-400 font-medium">กำลังโหลดข้อมูล...</td></tr>
                ) : cases.length > 0 ? (
                  cases.map((item) => (
                    <tr key={item.id} className="border-b border-slate-100 text-slate-600 hover:bg-slate-50/80">
                      <td className="px-6 py-4 font-bold text-blue-600">{item.id}</td>
                      <td className="px-6 py-4">{item.customer}</td>
                      <td className="px-6 py-4">{item.workType}</td>
                      <td className="px-6 py-4">{item.country}</td>
                      <td className="px-6 py-4">{item.dateCreated}</td>
                      <td className="px-6 py-4">{item.dueDate}</td>
                      <td className="px-6 py-4">{item.department}</td>
                      <td className="px-6 py-4">{item.assignee}</td>
                      <td className="px-6 py-4"><StatusBadge status={item.status} /></td>
                      <td className="px-6 py-4 text-xs text-slate-500">{item.progress}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={10} className="px-6 py-20 text-center text-slate-400 font-medium">ไม่พบข้อมูล</td></tr>
                )}
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

function mapMasterCaseToUiCase(row: MasterCaseRow): UiCase {
  const workType = displayValue(row.WORK_TYPE);
  const caseId = displayValue(row.CASE_ID);
  const documentStatus = displayValue(row.DOCUMENT_STATUS);
  const adminStatus = displayValue(row.ADMIN_STATUS);

  return {
    id: caseId,
    customer: displayValue(row.CUSTOMER_NAME || row.COMPANY_NAME),
    workType,
    country: "-",
    dateCreated: displayValue(row.DATE_CREATED),
    dueDate: displayValue(row.DUE_DATE),
    department: displayValue(row.OWNER_DEPT),
    assignee: displayValue(row.ASSIGNED_TO),
    status: displayValue(row.CASE_STATUS),
    progress: `${documentStatus} / ${adminStatus}`,
    priority: displayValue(row.PRIORITY),
  };
}

function calculateStats(items: UiCase[]) {
  if (items.length === 0) {
    return emptyStats;
  }

  const today = startOfDay(new Date());
  const nearDueLimit = new Date(today);
  nearDueLimit.setDate(today.getDate() + 7);

  return {
    total: items.length,
    inProgress: items.filter((item) => !isClosedStatus(item.status)).length,
    nearDue: items.filter((item) => isNearDue(item, today, nearDueLimit)).length,
    overdue: items.filter((item) => isOverdue(item, today)).length,
    closed: items.filter((item) => isClosedStatus(item.status)).length,
  };
}

function StatusBadge({ status }: { status: string }) {
  const normalized = normalizeText(status);
  const className =
    normalized.includes("CLOSE") || normalized.includes("ปิด")
      ? "bg-teal-50 text-teal-700 border-teal-200"
      : normalized.includes("PENDING") || normalized.includes("รอ")
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : "bg-blue-50 text-blue-700 border-blue-200";

  return (
    <span className={`inline-block rounded-full border px-3 py-1 text-xs font-bold ${className}`}>
      {status}
    </span>
  );
}

function isNearDue(item: UiCase, today: Date, nearDueLimit: Date) {
  if (isClosedStatus(item.status)) {
    return false;
  }

  const dueDate = parseDate(item.dueDate);
  return !!dueDate && dueDate >= today && dueDate <= nearDueLimit;
}

function isOverdue(item: UiCase, today: Date) {
  if (isClosedStatus(item.status)) {
    return false;
  }

  const dueDate = parseDate(item.dueDate);
  return !!dueDate && dueDate < today;
}

function isClosedStatus(status: string) {
  const normalized = normalizeText(status);
  return normalized.includes("CLOSE") || normalized.includes("COMPLETE") || normalized.includes("ปิด") || normalized.includes("เสร็จ");
}

function parseDate(value: string) {
  if (!value || value === "-") {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : startOfDay(date);
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function displayValue(value: string | undefined) {
  return value && value.trim() ? value.trim() : "-";
}

function normalizeText(value: string) {
  return value.trim().toUpperCase();
}
