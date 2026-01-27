// index.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Route de test
app.get("/ping", (req, res) => {
  res.json({ pong: true });
});

// Port fourni par Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
