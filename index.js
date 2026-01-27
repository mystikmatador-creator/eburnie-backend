const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Route test (obligatoire pour Railway)
app.get("/ping", (req, res) => {
  res.json({ pong: true, status: "Backend Eburnie actif" });
});

// Abonnement STANDARD
app.post("/abonnement/standard", (req, res) => {
  const data = req.body;
  res.json({
    success: true,
    type: "STANDARD",
    message: "Abonnement Standard reçu",
    data
  });
});

// Abonnement PRO
app.post("/abonnement/pro", (req, res) => {
  const data = req.body;
  res.json({
    success: true,
    type: "PRO",
    message: "Abonnement Pro reçu",
    data
  });
});

// Abonnement PREMIUM
app.post("/abonnement/premium", (req, res) => {
  const data = req.body;
  res.json({
    success: true,
    type: "PREMIUM",
    message: "Abonnement Premium reçu",
    data
  });
});

// PORT Railway (OBLIGATOIRE)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Serveur Eburnie lancé sur le port", PORT);
});