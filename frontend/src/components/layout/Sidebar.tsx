"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { 
  LayoutDashboard, ClipboardList, Clock, AlertTriangle, 
  CheckCircle, LogOut, Users, Settings, UserSquare, 
  Briefcase, Building2, ShieldAlert, FileText 
} from "lucide-react";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  const adminMenus = [
    { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { href: "/dashboard/tasks", label: "งานทั้งหมด", icon: <ClipboardList size={20} /> },
    { href: "/dashboard/near-due", label: "งานใกล้ครบกำหนด", icon: <Clock size={20} /> },
    { href: "/dashboard/overdue", label: "งานเกินกำหนด", icon: <AlertTriangle size={20} />, isAlert: true },
    { href: "/dashboard/closed", label: "ปิดงานแล้ว", icon: <CheckCircle size={20} /> },
    { href: "/dashboard/customers", label: "ลูกค้า", icon: <UserSquare size={20} /> },
    { href: "/dashboard/services", label: "ประเภทบริการ", icon: <Briefcase size={20} /> },
    { href: "/dashboard/staff", label: "พนักงาน", icon: <Users size={20} /> },
    { href: "/dashboard/departments", label: "แผนก", icon: <Building2 size={20} /> },
    { href: "/dashboard/issues", label: "ปัญหาที่ต้องติดตาม", icon: <ShieldAlert size={20} /> },
    { href: "/dashboard/reports", label: "รายงาน", icon: <FileText size={20} /> },
    { href: "/dashboard/settings", label: "ตั้งค่า", icon: <Settings size={20} /> },
  ];

  const userMenus = [
    { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { href: "/dashboard/tasks", label: "งานทั้งหมด", icon: <ClipboardList size={20} /> },
    { href: "/dashboard/near-due", label: "งานใกล้ครบกำหนด", icon: <Clock size={20} /> },
    { href: "/dashboard/overdue", label: "งานเกินกำหนด", icon: <AlertTriangle size={20} />, isAlert: true },
    { href: "/dashboard/closed", label: "ปิดงานแล้ว", icon: <CheckCircle size={20} /> },
  ];

  const currentMenus = user.role === "admin" ? adminMenus : userMenus;

  return (
    // เปลี่ยนกลับเป็น bg-white สบายตา
    <aside className="w-64 h-[calc(100vh-4rem)] bg-white border-r border-slate-200 flex flex-col fixed left-0 top-16 shadow-sm z-20">
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
        {currentMenus.map((menu) => {
          const isActive = pathname === menu.href;
          return (
            <Link key={menu.href} href={menu.href}>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive 
                  ? "bg-blue-50 text-blue-700 shadow-sm border-l-4 border-blue-600" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-blue-600 hover:translate-x-1"
              }`}>
                <div className={`${isActive ? "text-blue-600" : menu.isAlert ? "text-red-500 group-hover:text-red-600" : "text-slate-400 group-hover:text-blue-500"} transition-colors`}>
                  {menu.icon}
                </div>
                {menu.label}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all hover:-translate-y-0.5"
        >
          <LogOut size={20} />
          ออกจากระบบ
        </button>
      </div>
    </aside>
  );
}