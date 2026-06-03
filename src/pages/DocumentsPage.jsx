// pages/DocumentsPage.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, Download, CheckCircle } from "lucide-react";
import { BottomNav } from "./CartePage";

export default function DocumentsPage({ navigate }) {
  const { currentUser } = useAuth();
  const [downloaded, setDownloaded] = useState(null);

  const formatMontant = (m) =>
    new Intl.NumberFormat("ru-RU", { minimumFractionDigits: 2 }).format(m);

  const today = new Date().toLocaleDateString("ru-RU");

  const downloadRIB = () => {
    const content = `
╔══════════════════════════════════════════════════════╗
║         БАНКОВСКИЕ РЕКВИЗИТЫ (RIB)                   ║
╚══════════════════════════════════════════════════════╝

SBERBANK
─────────────────────────────────────

ВЛАДЕЛЕЦ СЧЁТА
Имя : ${currentUser?.nom}
Адрес : ${currentUser?.adresse}

БАНКОВСКИЕ ДАННЫЕ
IBAN : ${currentUser?.numeroCompte}
BIC  : ${currentUser?.bic}

Дата выдачи : ${today}

Настоящий документ подтверждает правильность банковских реквизитов.
──────────────────────────────────────────────────────
© 2026 SBERBANK
    `.trim();

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `RIB_${currentUser?.nom?.replace(/\s/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded("rib");
    setTimeout(() => setDownloaded(null), 2000);
  };

  const downloadReleve = () => {
    const content = `
╔══════════════════════════════════════════════════════╗
║              ВЫПИСКА ПО СЧЁТУ                        ║
╚══════════════════════════════════════════════════════╝

SBERBANK
Выписка от ${today}
─────────────────────────────────────

ВЛАДЕЛЕЦ : ${currentUser?.nom}
СЧЁТ № : ${currentUser?.numeroCompte}
BIC       : ${currentUser?.bic}

ТЕКУЩИЙ БАЛАНС : ${formatMontant(currentUser?.solde)} ${currentUser?.devise}

═══════════════════════════════════════
ПОСЛЕДНИЕ ОПЕРАЦИИ
═══════════════════════════════════════

${(currentUser?.transactions || []).map(op =>
  `${new Date(op.date).toLocaleDateString("ru-RU").padEnd(12)} | ${op.libelle.padEnd(35)} | ${op.montant > 0 ? "+" : ""}${formatMontant(op.montant)} ${currentUser?.devise}`
).join("\n")}

═══════════════════════════════════════
Документ сформирован ${today}
© 2026 SBERBANK
    `.trim();

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Vypiska_${currentUser?.nom?.replace(/\s/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded("releve");
    setTimeout(() => setDownloaded(null), 2000);
  };

  const docs = [
    {
      id: "rib",
      titre: "Банковские реквизиты",
      description: "IBAN, BIC и полные банковские данные",
      action: downloadRIB,
      emoji: "🏦",
    },
    {
      id: "releve",
      titre: "Выписка по счёту",
      description: "История операций и текущий баланс",
      action: downloadReleve,
      emoji: "📊",
    },
  ];

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
        <h1 className="text-xl font-bold text-gray-900">Мои документы</h1>

        <div className="space-y-3">
          {docs.map((doc) => (
            <div key={doc.id} className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-2xl shrink-0">
                {doc.emoji}
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-800 text-sm">{doc.titre}</p>
                <p className="text-xs text-gray-500 mt-0.5">{doc.description}</p>
              </div>
              <button onClick={doc.action}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition shrink-0 ${
                  downloaded === doc.id ? "bg-green-500 text-white" : "bg-red-600 hover:bg-red-700 text-white"
                }`}>
                {downloaded === doc.id ? <CheckCircle size={18} /> : <Download size={18} />}
              </button>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <p className="text-sm text-blue-800">
            💡 Документы формируются в режиме реального времени на основе ваших текущих банковских данных.
          </p>
        </div>
      </main>

      <BottomNav navigate={navigate} active="documents" />
    </div>
  );
}