// pages/CartePage.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, CreditCard, Lock, Eye, EyeOff, Shield } from "lucide-react";

export default function CartePage({ navigate }) {
  const { currentUser } = useAuth();
  const [showCvv, setShowCvv] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
        <h1 className="text-xl font-bold text-gray-900">Ma carte bancaire</h1>

        {/* Carte visuelle */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-xl" style={{ background: "linear-gradient(135deg, #cc0000 0%, #8b0000 100%)", aspectRatio: "1.586" }}>
          {/* Décoration */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full -translate-y-12 translate-x-12" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full translate-y-8 -translate-x-8" />

          <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
            {/* Logo + statut */}
            <div className="flex justify-between items-start">
              <span className="text-xl font-bold tracking-wide">SBERBANK</span>
              <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Lock size={11} /> ACTIVE
              </span>
            </div>

            {/* Puce */}
            <div className="w-10 h-7 bg-yellow-300 rounded-md opacity-90" />

            {/* Numéro */}
            <div>
              <p className="text-lg font-mono tracking-widest mb-3">
                •••• •••• •••• {currentUser?.carte || "4298"}
              </p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-white/60 text-xs mb-1">TITULAIRE</p>
                  <p className="font-semibold text-sm uppercase tracking-wide">
                    {currentUser?.nom}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white/60 text-xs mb-1">EXPIRE</p>
                  <p className="font-semibold">{currentUser?.exp || "12/27"}</p>
                </div>
                <div className="text-2xl font-bold italic opacity-80">VISA</div>
              </div>
            </div>
          </div>
        </div>

        {/* Infos carte */}
        <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
          <h2 className="font-bold text-gray-800">Détails de la carte</h2>

          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <CreditCard size={18} className="text-gray-400" />
              <span className="text-sm text-gray-600">Numéro</span>
            </div>
            <span className="font-mono font-semibold text-gray-800">
              •••• •••• •••• {currentUser?.carte || "4298"}
            </span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Shield size={18} className="text-gray-400" />
              <span className="text-sm text-gray-600">CVV</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-semibold text-gray-800">
                {showCvv ? "742" : "•••"}
              </span>
              <button onClick={() => setShowCvv(!showCvv)} className="text-gray-400 hover:text-gray-600">
                {showCvv ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-sm text-gray-600">Date d'expiration</span>
            <span className="font-semibold text-gray-800">{currentUser?.exp || "12/27"}</span>
          </div>

          <div className="flex justify-between items-center py-3">
            <span className="text-sm text-gray-600">Statut</span>
            <span className="bg-red-100 text-red-700 font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1">
              <Lock size={11} /> Bloquée
            </span>
          </div>
        </div>

        {/* Alerte */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex gap-3">
          <Lock size={20} className="text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-red-700 text-sm">Carte temporairement bloquée</p>
            <p className="text-red-600 text-xs mt-1">
              Votre carte est bloquée suite au blocage de votre compte. Contactez votre conseiller SBERBANK pour la débloquer.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <BottomNav navigate={navigate} active="carte" />
      </main>
    </div>
  );
}

function BottomNav({ navigate, active }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="max-w-lg mx-auto flex justify-around py-2">
        {[
          { id: "dashboard", label: "Accueil", icon: "🏠" },
          { id: "carte", label: "Carte", icon: "💳" },
          { id: "profil", label: "Profil", icon: "👤" },
          { id: "documents", label: "Documents", icon: "📄" },
          { id: "notifications", label: "Alertes", icon: "🔔" },
        ].map((item) => (
          <button key={item.id} onClick={() => navigate(item.id)}
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition ${active === item.id ? "text-red-600" : "text-gray-400 hover:text-gray-600"}`}>
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export { BottomNav };