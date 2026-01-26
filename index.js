import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// -------- ROUTE TEST ----------
app.get("/", (req, res) => {
  res.json({ message: "Backend Eburnie actif 🚀" });
});

app.get("/ping", (req, res) => {
  res.json({ pong: true });
});

// -------- ABONNEMENTS ----------
const abonnements = {
  standard: { prix: 0, description: "Page prestataire basique" },
  pro: { prix: 3000, description: "Badge Pro, galerie jusqu'à 10 photos" },
  premium: { prix: 5000, description: "Badge Premium, galerie photos + vidéos, messagerie directe" }
};

// Route pour récupérer les abonnements
app.get("/abonnements", (req, res) => {
  res.json(abonnements);
});

// Route pour créer un abonnement pour un prestataire
app.post("/abonnement", (req, res) => {
  const { prestataire, type } = req.body;
  if(!prestataire || !type || !abonnements[type]){
    return res.status(400).json({ erreur: "Données invalides" });
  }
  // Ici on ferait le paiement puis l'enregistrement
  // Pour l'instant, on simule
  res.json({
    message: `Abonnement ${type} enregistré pour ${prestataire}`,
    abonnement: abonnements[type]
  });
});

// -------- PORT ----------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Serveur lancé sur le port", PORT));