const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// PORT dynamique pour Railway
const PORT = process.env.PORT || 8080;

// ==== ROUTE TEST ====
app.get("/ping", (req, res) => {
  res.json({ pong: true, status: "backend actif" });
});

// ==== PLANS DISPONIBLES ====
const plans = [
  { type: "standard", price: 0, description: "GRATUIT - Page basique" },
  { type: "pro", price: 3000, description: "Badge Pro + galerie 10 photos / 10 vidéos" },
  { type: "premium", price: 5000, description: "Badge Premium + prioritaire + réseaux sociaux" }
];

app.get("/plans", (req, res) => {
  res.json(plans);
});

// ==== ABONNEMENTS (SIMULATION WAVE) ====
let subscriptions = []; // temporaire, mémoire serveur

app.post("/subscribe", (req, res) => {
  const { name, phone, planType } = req.body;

  // validations simples
  if (!name || !phone || !planType) {
    return res.status(400).json({ error: "name, phone et planType sont requis" });
  }

  const plan = plans.find(p => p.type === planType);
  if (!plan) return res.status(400).json({ error: "plan invalide" });

  // simulation paiement Wave
  const transactionId = "WAVE-" + Date.now();
  const subscription = {
    id: transactionId,
    name,
    phone,
    planType,
    price: plan.price,
    status: plan.price === 0 ? "active" : "pending", // Standard = gratuit
    date: new Date()
  };

  subscriptions.push(subscription);

  res.json({
    message: `Abonnement ${planType} enregistré`,
    transactionId,
    status: subscription.status
  });
});

// ==== RÉCUPÉRER LES ABONNEMENTS ====
app.get("/subscriptions", (req, res) => {
  res.json(subscriptions);
});

// ==== START SERVER ====
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
