// App.jsx
import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import VirementPage from "./pages/VirementPage";
import CartePage from "./pages/CartePage";
import ProfilPage from "./pages/ProfilPage";
import HistoriquePage from "./pages/HistoriquePage";
import NotificationsPage from "./pages/NotificationsPage";
import DocumentsPage from "./pages/DocumentsPage";

function AppContent() {
  const { currentUser } = useAuth();
  const [page, setPage] = useState("login");

  const navigate = (destination) => setPage(destination);

  if (!currentUser && page !== "login") {
    return <LoginPage navigate={navigate} />;
  }

  switch (page) {
    case "login":         return <LoginPage navigate={navigate} />;
    case "dashboard":     return <DashboardPage navigate={navigate} />;
    case "virement":      return <VirementPage navigate={navigate} />;
    case "carte":         return <CartePage navigate={navigate} />;
    case "profil":        return <ProfilPage navigate={navigate} />;
    case "historique":    return <HistoriquePage navigate={navigate} />;
    case "notifications": return <NotificationsPage navigate={navigate} />;
    case "documents":     return <DocumentsPage navigate={navigate} />;
    default:              return <LoginPage navigate={navigate} />;
  }
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}