"use client";
import React from "react";
import { PlusCircle, Save } from "lucide-react";

export default function AddJobPage() {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm animate-in fade-in duration-500 max-w-3xl">
      <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><PlusCircle size={24} /></div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">เพิ่มงานใหม่ (Add New Job)</h1>
          <p className="text-sm text-gray-500">สร้างเคสใหม่และส่งการแจ้งเตือน (LINE Notify)</p>
        </div>
      </div>
      <form className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">ชื่องาน / รายละเอียดเคส</label>
          <input type="text" className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 text-sm" placeholder="ระบุรายละเอียด..." />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">ผู้รับผิดชอบ</label>
            <select className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 text-sm">
              <option>เลือกผู้รับผิดชอบ...</option>
              <option>teecyd</option>
              <option>newcyd</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">วันครบกำหนด</label>
            <input type="date" className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 text-sm" />
          </div>
        </div>
        <button type="button" className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium text-sm flex items-center gap-2 hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
          <Save size={18} /> บันทึกและแจ้งเตือน
        </button>
      </form>
    </div>
  );
}