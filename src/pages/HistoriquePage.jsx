// pages/HistoriquePage.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, TrendingUp, TrendingDown, Search } from "lucide-react";
import { BottomNav } from "./CartePage";

export default function HistoriquePage({ navigate }) {
  const { currentUser } = useAuth();
  const [search, setSearch] = useState("");
  const [filtre, setFiltre] = useState("all");

  const formatMontant = (m) =>
    new Intl.NumberFormat("ru-RU", { minimumFractionDigits: 2 }).format(m);

  const filtered = (currentUser?.transactions || []).filter((op) => {
    const matchSearch = op.libelle.toLowerCase().includes(search.toLowerCase());
    const matchFiltre = filtre === "all" || op.type === filtre;
    return matchSearch && matchFiltre;
  });

  const totalCredit = filtered.filter(o => o.type === "credit").reduce((s, o) => s + o.montant, 0);
  const totalDebit = filtered.filter(o => o.type === "debit").reduce((s, o) => s + Math.abs(o.montant), 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
        <div className="max-w-lg mx-auto flex items-center gap-4">
          <button onClick={() => navigate("dashboard")} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition">
            <ArrowLeft size={22} className="text-gray-700" />
          </button>
          <img src="images/L2.jpeg" alt="SBERBANK" className="h-8 w-auto object-contain" />
        </div>
      </header>

      <main className="max-w-lg mx-auto w-full px-4 py-6 space-y-4">
        <h1 className="text-xl font-bold text-gray-900">История операций</h1>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={16} className="text-green-600" />
              <p className="text-xs text-green-700 font-medium">Поступления</p>
            </div>
            <p className="text-xl font-bold text-green-700">+{formatMontant(totalCredit)} {currentUser?.devise}</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown size={16} className="text-orange-600" />
              <p className="text-xs text-orange-700 font-medium">Расходы</p>
            </div>
            <p className="text-xl font-bold text-orange-700">-{formatMontant(totalDebit)} {currentUser?.devise}</p>
          </div>
        </div>

        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Поиск операции..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 text-sm" />
        </div>

        <div className="flex gap-2">
          {[["all","Все"],["credit","Поступления"],["debit","Расходы"]].map(([val, label]) => (
            <button key={val} onClick={() => setFiltre(val)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                filtre === val ? "bg-red-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}>
              {label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-100">
          {filtered.length === 0 ? (
            <div className="p-10 text-center text-gray-400">
              <p className="text-lg font-semibold">Нет операций</p>
            </div>
          ) : (
            filtered.map((op) => (
              <div key={op.id} className="flex items-center gap-3 p-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${op.type === "credit" ? "bg-green-100" : "bg-orange-100"}`}>
                  {op.type === "credit" ? <TrendingUp size={18} className="text-green-600" /> : <TrendingDown size={18} className="text-orange-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">{op.libelle}</p>
                  <p className="text-xs text-gray-400">{new Date(op.date).toLocaleDateString("ru-RU")} · {op.categorie}</p>
                </div>
                <p className={`font-bold text-sm ${op.type === "credit" ? "text-green-600" : "text-gray-800"}`}>
                  {op.montant > 0 ? "+" : ""}{formatMontant(op.montant)} {currentUser?.devise}
                </p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}