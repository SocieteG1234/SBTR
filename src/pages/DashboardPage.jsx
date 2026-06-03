// pages/DashboardPage.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { LogOut, Lock, TrendingUp, TrendingDown, Send, Bell } from "lucide-react";
import { BottomNav } from "./CartePage";

export default function DashboardPage({ navigate }) {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("login");
  };

  const formatMontant = (m) =>
    new Intl.NumberFormat("ru-RU", { minimumFractionDigits: 2 }).format(m);

  return (
    <div className="min-h-screen bg-gray-50 pb-24 flex flex-col">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <img src="images/L2.jpeg" alt="SBERBANK" className="h-8 w-auto object-contain" />
          <div className="flex items-center gap-2">
            <button onClick={() => navigate("notifications")} className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition">
              <Bell size={22} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">2</span>
            </button>
            <button onClick={handleLogout} className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto w-full px-4 py-6 space-y-4">

        <div>
          <p className="text-gray-500 text-sm">Добро пожаловать,</p>
          <h1 className="text-xl font-bold text-gray-900">{currentUser?.nom}</h1>
        </div>

        {/* Solde */}
        <div className="bg-red-600 rounded-2xl p-6 text-white shadow-lg">
          <p className="text-red-100 text-sm mb-1">Доступный баланс</p>
          <p className="text-4xl font-bold">{formatMontant(currentUser?.solde)} {currentUser?.devise}</p>
          <p className="text-red-200 text-xs mt-2">{currentUser?.numeroCompte}</p>
        </div>

        {/* Alerte blocage */}
        {currentUser?.compteBloque && (
          <div className="bg-white border-2 border-red-500 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Lock size={20} className="text-red-600" />
              </div>
              <div>
                <p className="font-bold text-red-700">Счёт заблокирован</p>
                <p className="text-xs text-gray-500">Требуется действие</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">{currentUser?.blockReason}</p>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
              <p className="text-sm text-red-700 mb-1 font-medium">Сумма для разблокировки</p>
              <p className="text-3xl font-bold text-red-600">{formatMontant(currentUser?.montantDeblocage)} {currentUser?.devise}</p>
              <p className="text-xs text-gray-500 mt-2">Свяжитесь с вашим консультантом SBERBANK.</p>
            </div>
          </div>
        )}

        {/* Actions rapides */}
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => navigate("virement")} className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-gray-50 transition shadow-sm">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Send size={20} className="text-red-600" />
            </div>
            <p className="text-sm font-semibold text-gray-800">Перевод</p>
          </button>
          <button onClick={() => navigate("historique")} className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-gray-50 transition shadow-sm">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <TrendingUp size={20} className="text-blue-600" />
            </div>
            <p className="text-sm font-semibold text-gray-800">История</p>
          </button>
        </div>

        {/* Dernières opérations */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800">Последние операции</h2>
            <button onClick={() => navigate("historique")} className="text-red-600 text-xs font-semibold">Смотреть все</button>
          </div>
          <div className="divide-y divide-gray-100">
            {(currentUser?.transactions || []).slice(0, 4).map((op) => (
              <div key={op.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center ${op.type === "credit" ? "bg-green-100" : "bg-orange-100"}`}>
                    {op.type === "credit" ? <TrendingUp size={16} className="text-green-600" /> : <TrendingDown size={16} className="text-orange-600" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{op.libelle}</p>
                    <p className="text-xs text-gray-400">{new Date(op.date).toLocaleDateString("ru-RU")}</p>
                  </div>
                </div>
                <p className={`font-bold text-sm ${op.type === "credit" ? "text-green-600" : "text-gray-800"}`}>
                  {op.montant > 0 ? "+" : ""}{formatMontant(op.montant)} {currentUser?.devise}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav navigate={navigate} active="dashboard" />
    </div>
  );
}