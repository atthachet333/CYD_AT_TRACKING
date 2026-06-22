// ฟังก์ชันนี้จะไปดึงข้อมูลจาก Backend API มา
export async function getDepartments() {
  try {
    const response = await fetch("http://localhost:5000/api/departments"); // URL ของ Backend
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    return [];
  }
}