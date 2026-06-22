"use client";
import React from "react";
import { Building, Users, Bell, Clock, Database, Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl">
      <h1 className="text-3xl font-bold text-slate-800">ตั้งค่าระบบ</h1>

      <div className="space-y-6">
         {/* ข้อมูลบริษัท */}
         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3 mb-4"><Building size={18} className="text-blue-600"/> ข้อมูลบริษัท</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div><label className="text-xs font-bold text-slate-600">ชื่อบริษัท</label><input type="text" defaultValue="CHAIDET PROGRESS CO., LTD." className="w-full p-2.5 mt-1 rounded-xl border border-slate-200 text-sm bg-slate-50" disabled /></div>
               <div><label className="text-xs font-bold text-slate-600">อีเมลติดต่อ</label><input type="text" placeholder="info@chaidetprogress.co.th" className="w-full p-2.5 mt-1 rounded-xl border border-slate-200 text-sm" /></div>
            </div>
         </div>

         {/* การแจ้งเตือน & SLA */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
               <h3 className="font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3 mb-4"><Bell size={18} className="text-amber-500"/> การแจ้งเตือน (LINE/Email)</h3>
               <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm text-slate-700"><span>แจ้งเตือนงานใกล้ครบกำหนด</span><input type="checkbox" defaultChecked className="toggle" /></div>
                  <div className="flex justify-between items-center text-sm text-slate-700"><span>แจ้งเตือนงานเกินกำหนด</span><input type="checkbox" defaultChecked className="toggle" /></div>
                  <div className="flex justify-between items-center text-sm text-slate-700"><span>แจ้งเตือนเมื่อมีการมอบหมายงาน</span><input type="checkbox" defaultChecked className="toggle" /></div>
               </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
               <h3 className="font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3 mb-4"><Clock size={18} className="text-red-500"/> SLA / วันครบกำหนด</h3>
               <div className="space-y-4">
                  <div><label className="text-xs font-bold text-slate-600">กำหนด SLA เริ่มต้น (ชั่วโมง)</label><input type="number" defaultValue="48" className="w-full p-2.5 mt-1 rounded-xl border border-slate-200 text-sm" /></div>
                  <div><label className="text-xs font-bold text-slate-600">แจ้งเตือนก่อนครบกำหนด (วัน)</label><input type="number" defaultValue="3" className="w-full p-2.5 mt-1 rounded-xl border border-slate-200 text-sm" /></div>
               </div>
            </div>
         </div>

         {/* บันทึก */}
         <div className="flex justify-end pt-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"><Save size={18}/> บันทึกการตั้งค่าทั้งหมด</button>
         </div>
      </div>
    </div>
  );
}