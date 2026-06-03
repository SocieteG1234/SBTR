// pages/ProfilPage.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, User, Mail, Phone, MapPin, LogOut } from "lucide-react";
import { BottomNav } from "./CartePage";

export default function ProfilPage({ navigate }) {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("login");
  };

  const infos = [
    { icon: User, label: "Nom complet", value: currentUser?.nom },
    { icon: Mail, label: "Email", value: currentUser?.email },
    { icon: Phone, label: "Téléphone", value: currentUser?.telephone },
    { icon: MapPin, label: "Adresse", value: currentUser?.adresse },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
        <div className="max-w-lg mx-auto flex items-center gap-4">
          <button onClick={() => navigate("dashboard")} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition">
            <ArrowLeft size={22} className="text-gray-700" />
          </button>
          <img src="images/L2.jpeg" alt="SBERBANK" className="h-8 w-auto object-contain" />
        </div>
      </header>

      <main className="max-w-lg mx-auto w-full px-4 py-6 space-y-5">
        <h1 className="text-xl font-bold text-gray-900">Mon profil</h1>

        {/* Avatar */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {currentUser?.nom?.charAt(0) || "G"}
          </div>
          <div>
            <p className="font-bold text-gray-900 text-lg">{currentUser?.nom}</p>
            <p className="text-gray-500 text-sm">Client SBERBANK</p>
            <span className="inline-block mt-1 bg-red-100 text-red-700 text-xs font-semibold px-2 py-0.5 rounded-full">
              Compte bloqué
            </span>
          </div>
        </div>

        {/* Informations */}
        <div className="bg-white rounded-2xl shadow-sm p-5 space-y-1">
          <h2 className="font-bold text-gray-800 mb-3">Informations personnelles</h2>
          {infos.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-4 py-3 border-b border-gray-100 last:border-0">
              <div className="w-9 h-9 bg-red-50 rounded-full flex items-center justify-center shrink-0">
                <Icon size={16} className="text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                <p className="text-sm font-semibold text-gray-800">{value || "—"}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Compte bancaire */}
        <div className="bg-white rounded-2xl shadow-sm p-5 space-y-3">
          <h2 className="font-bold text-gray-800 mb-3">Informations bancaires</h2>
          <div className="py-3 border-b border-gray-100">
            <p className="text-xs text-gray-400 mb-0.5">IBAN</p>
            <p className="text-sm font-mono font-semibold text-gray-800">{currentUser?.numeroCompte}</p>
          </div>
          <div className="py-3">
            <p className="text-xs text-gray-400 mb-0.5">BIC / SWIFT</p>
            <p className="text-sm font-mono font-semibold text-gray-800">{currentUser?.bic}</p>
          </div>
        </div>

        {/* Déconnexion */}
        <button
          onClick={handleLogout}
          className="w-full bg-white border-2 border-red-200 text-red-600 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-50 transition shadow-sm"
        >
          <LogOut size={20} />
          Se déconnecter
        </button>
      </main>

      <BottomNav navigate={navigate} active="profil" />
    </div>
  );
}