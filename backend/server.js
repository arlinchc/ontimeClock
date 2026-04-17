const express = require("express");
const cors = require("cors");

// Crear app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ================== ROUTES ==================

// Teachers
const teachersRoutes = require("./routes/teachersRoutes");
app.use("/api/teachers", teachersRoutes);

// Schedules
const schedulesRoutes = require("./routes/schedulesRoutes");
app.use("/api/schedules", schedulesRoutes);

// Records
const recordsRoutes = require("./routes/recordsRoutes");
app.use("/api/records", recordsRoutes);

// Reports
const reportsRoutes = require("./routes/reportsRoutes");
app.use("/api/reports", reportsRoutes);

// Configuración (Chiquil)
const systemConfigRoutes = require("./routes/SystemConfigRoutes");
app.use("/api/systemconfig", systemConfigRoutes);

// ============================================

// Ruta base
app.get("/", (req, res) => {
  res.send("API onTimeClock funcionando 🚀");
});

// Puerto
const PORT = process.env.PORT || 3000;

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});