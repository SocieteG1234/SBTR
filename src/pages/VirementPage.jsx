// pages/VirementPage.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, Send, CheckCircle } from "lucide-react";

export default function VirementPage({ navigate }) {
  const { currentUser, setCurrentUser } = useAuth();

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    iban: "",
    bic: "",
    montant: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const formatMontant = (m) =>
    new Intl.NumberFormat("ru-RU", { minimumFractionDigits: 2 }).format(m);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nom.trim()) newErrors.nom = "Фамилия обязательна";
    if (!form.prenom.trim()) newErrors.prenom = "Имя обязательно";
    if (!form.iban.trim()) newErrors.iban = "IBAN обязателен";
    if (!form.bic.trim()) newErrors.bic = "BIC обязателен";
    if (!form.montant || isNaN(form.montant) || Number(form.montant) <= 0)
      newErrors.montant = "Неверная сумма";
    else if (Number(form.montant) > currentUser?.solde)
      newErrors.montant = "Недостаточно средств";
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const montant = Number(form.montant);
      const newTransaction = {
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        libelle: `Перевод на имя ${form.prenom} ${form.nom}`,
        montant: -montant,
        type: "debit",
        categorie: "Перевод",
      };

      const updatedTransactions = [
        newTransaction,
        ...(currentUser?.transactions || []).filter(
          (t) => !(t.type === "credit" && t.libelle.toLowerCase().includes("sberbank"))
        ),
      ];

      const updatedUser = {
        ...currentUser,
        solde: currentUser.solde - montant,
        transactions: updatedTransactions,
      };

      setCurrentUser(updatedUser);
      localStorage.setItem("rgc_user", JSON.stringify(updatedUser));

      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  if (blocked) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
        <div className="bg-white rounded-2xl shadow-md p-8 max-w-sm w-full text-center space-y-5">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="text-red-600" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Счёт заблокирован</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Ваш счёт был заблокирован по соображениям безопасности. Пожалуйста, свяжитесь с вашим менеджером.
          </p>
          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-400 mb-1">Менеджер счёта</p>
            <p className="text-base font-bold text-gray-800">Sergei Vasilenko</p>
            <p className="text-xs text-gray-400 mt-1">sergei.vasilenko@sberbank.ru</p>
          </div>
          <div className="text-xs text-gray-400 pt-2">© 2018 SBERBANK</div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
          <div className="max-w-lg mx-auto flex items-center gap-4">
            <button onClick={() => navigate("dashboard")} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition">
              <ArrowLeft size={22} className="text-gray-700" />
            </button>
            <img src="images/L2.jpeg" alt="SBERBANK" className="h-8 w-auto object-contain" />
          </div>
        </header>
        <main className="max-w-lg mx-auto w-full px-4 py-16 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Перевод выполнен!</h2>
          <p className="text-gray-500 text-sm mb-2">
            {formatMontant(Number(form.montant))} {currentUser?.devise} отправлено
          </p>
          <p className="font-bold text-gray-800 text-lg mb-1">{form.prenom} {form.nom}</p>
          <p className="text-xs text-gray-400 mb-8">IBAN : {form.iban}</p>
          <button
            onClick={() => setBlocked(true)}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-full transition"
          >
            Вернуться на главную
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-10">
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
        <div className="max-w-lg mx-auto flex items-center gap-4">
          <button onClick={() => navigate("dashboard")} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition">
            <ArrowLeft size={22} className="text-gray-700" />
          </button>
          <img src="images/L2.jpeg" alt="SBERBANK" className="h-8 w-auto object-contain" />
        </div>
      </header>

      <main className="max-w-lg mx-auto w-full px-4 py-6 space-y-5">
        <h1 className="text-xl font-bold text-gray-900">Выполнить перевод</h1>

        <div className="bg-red-600 rounded-2xl p-4 text-white">
          <p className="text-red-100 text-xs mb-1">Доступный баланс</p>
          <p className="text-2xl font-bold">{formatMontant(currentUser?.solde)} {currentUser?.devise}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
          <h2 className="font-bold text-gray-800">Получатель</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Имя</label>
              <input name="prenom" value={form.prenom} onChange={handleChange} placeholder="Иван"
                className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 ${errors.prenom ? "border-red-400" : "border-gray-200"}`} />
              {errors.prenom && <p className="text-red-500 text-xs mt-1">{errors.prenom}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Фамилия</label>
              <input name="nom" value={form.nom} onChange={handleChange} placeholder="Иванов"
                className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 ${errors.nom ? "border-red-400" : "border-gray-200"}`} />
              {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">IBAN</label>
            <input name="iban" value={form.iban} onChange={handleChange} placeholder="FR76 0000 0000 0000 0000 0000 000"
              className={`w-full border rounded-xl px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-red-400 ${errors.iban ? "border-red-400" : "border-gray-200"}`} />
            {errors.iban && <p className="text-red-500 text-xs mt-1">{errors.iban}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">BIC / SWIFT</label>
            <input name="bic" value={form.bic} onChange={handleChange} placeholder="BNPAFRPPXXX"
              className={`w-full border rounded-xl px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-red-400 ${errors.bic ? "border-red-400" : "border-gray-200"}`} />
            {errors.bic && <p className="text-red-500 text-xs mt-1">{errors.bic}</p>}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
          <h2 className="font-bold text-gray-800">Сумма</h2>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Сумма перевода</label>
            <div className="relative">
              <input name="montant" type="number" value={form.montant} onChange={handleChange} placeholder="0.00" min="0"
                className={`w-full border rounded-xl px-3 py-2.5 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 ${errors.montant ? "border-red-400" : "border-gray-200"}`} />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">{currentUser?.devise}</span>
            </div>
            {errors.montant && <p className="text-red-500 text-xs mt-1">{errors.montant}</p>}
          </div>
        </div>

        <button onClick={handleSubmit} disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-full transition flex items-center justify-center gap-2 disabled:opacity-60">
          {loading ? "Обработка..." : (<><Send size={18} /> Отправить перевод</>)}
        </button>
      </main>

      <div className="text-center py-4 text-xs text-gray-400 border-t bg-white mt-auto">
        © 2009 SBERBANK
      </div>
    </div>
  );
}