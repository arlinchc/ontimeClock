const express = require("express");
const cors = require("cors"); // permite que React llame a las APIs

const teachersRoutes = require("./routes/teachersRoutes");

const app = express();

app.use(cors());
app.use(express.json()); 

app.use("/api/teachers", teachersRoutes);

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Backend funcionando");
});

app.listen(PORT, () => {
  console.log("Servidor de Backend en puerto: " + PORT);
});