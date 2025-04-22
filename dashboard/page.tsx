"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { verifyToken } from "../utils/auth";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const { userId } = verifyToken(token);
      // Burada kullanıcı bilgilerini API'den çekebilirsiniz
      // Örnek amaçlı localStorage'dan alıyoruz
      const userData = JSON.parse(localStorage.getItem("user") || "null");
      setUser(userData);
    } catch {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">CRM Panosu</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Hoş geldiniz, {user.name}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            <p className="text-gray-500">CRM İçeriği Burada Gösterilecek</p>
          </div>
        </div>
      </main>
    </div>
  );
}