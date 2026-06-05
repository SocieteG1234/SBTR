// pages/LoginPage.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, Lock, Check } from "lucide-react";

export default function LoginPage({ navigate }) {
  const { login } = useAuth();
  const [step, setStep] = useState("code");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (code.length < 6) {
      setError("Код клиента должен содержать не менее 6 цифр");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("password");
    }, 700);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      const result = login(code, password);
      setLoading(false);
      if (result.success) {
        navigate("dashboard");
      } else {
        setError(result.message);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">

      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-center gap-3">
        <img src="images/L2.jpeg" alt="SBERBANK" className="h-12 w-auto object-contain" />
        <span className="text-2xl font-bold text-red-600">SBERBANK</span>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 py-10 max-w-md mx-auto w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {step === "code" ? "Вход в систему" : "Секретный код"}
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          {step === "code"
            ? "Введите ваш код клиента"
            : "Введите ваш секретный код"}
        </p>

        {step === "code" ? (
          <form onSubmit={handleCodeSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Код клиента
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                  className="w-full border-b-2 border-gray-800 py-3 text-2xl tracking-widest bg-transparent focus:outline-none focus:border-red-600 transition"
                  placeholder="········"
                  maxLength="10"
                  autoFocus
                />
                {code.length >= 6 && (
                  <Check className="absolute right-0 top-1/2 -translate-y-1/2 text-green-600" size={22} />
                )}
              </div>
              {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={loading || code.length < 6}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Проверка..." : "Продолжить"}
            </button>
          </form>
        ) : (
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Секретный код
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-b-2 border-gray-800 py-3 pr-10 text-2xl tracking-widest bg-transparent focus:outline-none focus:border-red-600 transition"
                  placeholder="······"
                  maxLength="6"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
              {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => { setStep("code"); setError(""); setPassword(""); }}
                className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-full hover:bg-gray-50 transition"
              >
                Назад
              </button>
              <button
                type="submit"
                disabled={loading || password.length < 4}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Вход..." : "Войти"}
              </button>
            </div>
          </form>
        )}

        <div className="mt-10 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
            <Lock size={14} />
            <span>Защищённое соединение SSL 256 бит</span>
          </div>
        </div>
      </div>

      <div className="text-center py-4 text-xs text-gray-400 border-t">
        © 2009 SBERBANK – Все права защищены
      </div>
    </div>
  );
}