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
    blockReason: "Ваш счёт был временно заблокирован по соображениям безопасности. Пожалуйста, свяжитесь с вашим консультантом.",
    numeroCompte: "40898430000019513678",
    bic: "SABRRUMMXXX",
    carte: "4298",
    exp: "12/27",
    gestionnaire: "Сергей Василенко",
    decouvertAutorise: 0,
    decouvertUtilise: 0,
    transactions: [
      { id: 2, date: "2014-04-15", libelle: "Онлайн-покупка - Amazon", montant: -89.99, type: "debit", categorie: "Покупка" },
      { id: 3, date: "2014-04-10", libelle: "Снятие наличных в банкомате", montant: -200, type: "debit", categorie: "Снятие" },
      { id: 4, date: "2014-03-28", libelle: "Входящий перевод", montant: 3500, type: "credit", categorie: "Перевод" },
      { id: 5, date: "2014-03-05", libelle: "Списание аренды", montant: -850, type: "debit", categorie: "Жильё" },
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
    numeroCompte: "40898430000019513678",
    bic: "SABRRUMMXXX",
    carte: "0000",
    exp: "12/27",
    gestionnaire: "Сергей Василенко",
    decouvertAutorise: 0,
    decouvertUtilise: 0,
    transactions: []
  }
};

export const loginUser = (code, password) => {
  const user = usersDB[code];
  if (!user) return { success: false, message: "Неверный код клиента" };
  if (user.password !== password) return { success: false, message: "Неверный пароль" };
  const { password: _, ...userSafe } = user;
  return { success: true, user: userSafe };
};