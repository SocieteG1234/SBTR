// services/UserService.js

export const usersDB = {
  "07893516": {
    id: 1,
    code: "07893516",
    password: "260826",
    nom: "Petrovic Jean Pierre",
    email: "petrovic234@gmail.com",
    telephone: "+7 612 43 19 64",
    adresse: "Gema GUTIEREZ SANCHEZ 11 28025 Moscou, Russie",
    solde: 175000000,
    devise: "RUB",
    compteBloque: false,
    montantDeblocage: null,
    blockReason: "Votre compte a été temporairement bloqué pour des raisons de sécurité. Veuillez contacter votre conseiller.",
    numeroCompte: "ES76 0049 1234 5678 9012 3456",
    bic: "BSCHESMMXXX",
    carte: "4298",
    exp: "12/27",
    gestionnaire: "Sergei Vasilenko",
    decouvertAutorise: 0,
    decouvertUtilise: 0,
    transactions: [
      { id: 2, date: "2026-04-15", libelle: "Achat en ligne - Amazon", montant: -89.99, type: "debit", categorie: "Achat" },
      { id: 3, date: "2026-04-10", libelle: "Retrait DAB", montant: -200, type: "debit", categorie: "Retrait" },
      { id: 4, date: "2026-03-28", libelle: "Virement reçu", montant: 3500, type: "credit", categorie: "Virement" },
      { id: 5, date: "2026-03-05", libelle: "Prélèvement loyer", montant: -850, type: "debit", categorie: "Logement" },
    ]
  },

  "12345678": {
    id: 2,
    code: "12345678",
    password: "260826",
    nom: "Petrovic Jean Pierre",
    email: "",
    telephone: "",
    adresse: "Moscou, Russie",
    solde: 175000000,
    devise: "RUB",
    compteBloque: false,
    montantDeblocage: 0,
    blockReason: "",
    numeroCompte: "RU12 0482 3000 0000 0401 0000 001",
    bic: "SABRRUMM",
    carte: "0000",
    exp: "12/27",
    gestionnaire: "Sergei Vasilenko",
    decouvertAutorise: 0,
    decouvertUtilise: 0,
    transactions: []
  }
};

export const loginUser = (code, password) => {
  const user = usersDB[code];
  if (!user) return { success: false, message: "Code client incorrect" };
  if (user.password !== password) return { success: false, message: "Mot de passe incorrect" };
  const { password: _, ...userSafe } = user;
  return { success: true, user: userSafe };
};