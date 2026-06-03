// pages/NotificationsPage.jsx
import React from "react";
import { ArrowLeft, Lock, AlertTriangle, Info, Bell } from "lucide-react";
import { BottomNav } from "./CartePage";

const notifications = [
  {
    id: 1,
    type: "danger",
    titre: "Compte bloqué",
    message: "Votre compte a été temporairement bloqué pour des raisons de sécurité. Contactez votre conseiller.",
    date: "Aujourd'hui, 09:14",
    icon: Lock,
    lu: false,
  },
  {
    id: 2,
    type: "warning",
    titre: "Carte bancaire bloquée",
    message: "Votre carte Visa se terminant par 4298 est bloquée suite au blocage de votre compte.",
    date: "Aujourd'hui, 09:15",
    icon: AlertTriangle,
    lu: false,
  },
  {
    id: 3,
    type: "info",
    titre: "Virement reçu",
    message: "Vous avez reçu un virement de 924 607 RUB sur votre compte.",
    date: "20 mai 2026",
    icon: Info,
    lu: true,
  },
  {
    id: 4,
    type: "info",
    titre: "Connexion détectée",
    message: "Une nouvelle connexion a été détectée sur votre compte depuis un appareil inconnu.",
    date: "19 mai 2026",
    icon: Bell,
    lu: true,
  },
];

const typeStyles = {
  danger: "bg-red-50 border-red-200 text-red-700",
  warning: "bg-orange-50 border-orange-200 text-orange-700",
  info: "bg-blue-50 border-blue-200 text-blue-700",
};

const iconStyles = {
  danger: "bg-red-100 text-red-600",
  warning: "bg-orange-100 text-orange-600",
  info: "bg-blue-100 text-blue-600",
};

export default function NotificationsPage({ navigate }) {
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
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
          <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            {notifications.filter(n => !n.lu).length} nouvelles
          </span>
        </div>

        <div className="space-y-3">
          {notifications.map((notif) => {
            const Icon = notif.icon;
            return (
              <div key={notif.id}
                className={`border rounded-2xl p-4 flex gap-3 ${typeStyles[notif.type]} ${!notif.lu ? "shadow-sm" : "opacity-70"}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${iconStyles[notif.type]}`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold text-sm">{notif.titre}</p>
                    {!notif.lu && <span className="w-2 h-2 bg-red-600 rounded-full" />}
                  </div>
                  <p className="text-xs leading-relaxed mb-1">{notif.message}</p>
                  <p className="text-xs opacity-60">{notif.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <BottomNav navigate={navigate} active="notifications" />
    </div>
  );
}