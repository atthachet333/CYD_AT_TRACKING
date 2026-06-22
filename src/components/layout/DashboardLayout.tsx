"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  const adminOnlyPaths = [
    "/dashboard/customers",
    "/dashboard/services",
    "/dashboard/staff",
    "/dashboard/departments",
    "/dashboard/issues",
    "/dashboard/reports",
    "/dashboard/settings"
  ];

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
      return;
    }
    if (!isLoading && user && user.role === "user") {
      const isTryingToAccessAdminPage = adminOnlyPaths.some(path => pathname.startsWith(path));
      if (isTryingToAccessAdminPage) {
        router.replace("/dashboard");
        return;
      }
    }
    if (!isLoading && user) {
      setIsAuthorized(true);
    }
  }, [user, isLoading, router, pathname]);

  if (isLoading || !user || !isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-red-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 shadow-lg"></div>
      </div>
    );
  }

  return (
    // ปรับสีพื้นหลังหลัก (bg-gradient...) ให้ละมุนและมีสีสันแบบพาสเทลจางๆ
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-[#f4f7f9] to-red-50/40 flex flex-col font-sans selection:bg-blue-200">
      <Header />
      <div className="flex flex-1 pt-16">
        <Sidebar />
        {/* เลื่อน Sidebar.tsx ให้อยู่ข้างใต้ Header เลยตั้งเป็น ml-64 */}
        <main className="flex-1 ml-64 p-8 relative">
           {/* เพิ่มแสง Glow เป็น Background ลอยๆ ให้ดูมีมิติ */}
           <div className="absolute top-0 left-10 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
           <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-400/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
           
           {children}
        </main>
      </div>
    </div>
  );
}