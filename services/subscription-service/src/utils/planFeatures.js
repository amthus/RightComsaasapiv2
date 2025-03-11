// config/planFeatures.js

const planFeatures = {
    free: {
      annually: {
        price: 0,
        features: [
          "1 file d'attente",
          "1 utilisateur",
          "50 tickets par jour",
          "2 services",
          "Accès aux applications mobiles",
          "Gestion des comptoirs/zones",
          "Gestion des clients",
          "Gestion des appareils",
          "Affichage dynamique",
          "Sondage de satisfaction",
          "Rapports & analyses",
          "Notifications en temps réel",
          "Support gratuit",
        ],
      },
      monthly: {
        price: 0,
        features: [
          "1 file d'attente",
          "1 utilisateur",
          "50 tickets par jour",
          "2 services",
          "Accès aux applications mobiles",
          "Gestion des comptoirs/zones",
          "Gestion des clients",
          "Gestion des appareils",
          "Affichage dynamique",
          "Sondage de satisfaction",
          "Rapports & analyses",
          "Notifications en temps réel",
          "Support gratuit",
        ],
      },
    },
    lite: {
      annually: {
        price: 30,
        features: [
          "Everything in Free +",
          "1 file d'attente",
          "5 utilisateurs",
          "150 tickets par jour",
          "6 services",
          "Gestion de plusieurs files d'attente",
          "Gestion multi-sites",
          "Gestion des services",
          "Gestion des utilisateurs et des rôles",
          "Tableau de bord basé sur les rôles",
          "Distributeur de tickets virtuels",
        ],
      },
      monthly: {
        price: 50,
        features: [
          "Everything in Free +",
          "1 file d'attente",
          "5 utilisateurs",
          "150 tickets par jour",
          "6 services",
          "Gestion de plusieurs files d'attente",
          "Gestion multi-sites",
          "Gestion des services",
          "Tableau de bord basé sur les rôles",
          "Distributeur de tickets virtuels",
        ],
      },
    },
    pro: {
      annually: {
        price: 250,
        features: [
          "Everything in Pro +",
          "1 file d'attente",
          "10 utilisateurs",
          "Tickets illimités",
          "Services illimités",
          "Gestion avancée des clients",
          "Workflow et automatisation",
          "Rapports & analyses avancées",
          "Rapport de performance par e-mail",
          "Gestion des SLA",
          "Intégrations (SMS, USSD, Chatbot)",
        ],
      },
    },
    enterprise: {
      annually: {
        price: 0,
        features: [
          "Everything in Pro +",
          "Utilisateurs illimités",
          "Rapports et tableaux de bord personnalisés",
          "Facturation personnalisée",
          "Journal d'audit",
          "Intégrations personnalisées (CRM, marketing, facturation, support, etc.)",
          "Politique de sécurité personnalisée",
          "Support dédié",
        ],
      },
    },
  };
  
  module.exports = planFeatures;