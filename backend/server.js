const express = require("express");
const cors = require("cors");
const teachersRoutes = require("./routes/teachersRoutes");
// Añade esta línea después de las otras importaciones
const systemConfigRoutes = require('./routes/SystemConfigRoutes');


const app = express();

app.use(express.json());

app.use(cors());  // Asumiendo que tienes 'const cors = require('cors');' agregado en otro lugar

app.use("/api/teachers", teachersRoutes);

app.use('/api/systemconfig', systemConfigRoutes);





const PORT = 3000;
app.get("/", (req, res) => {
    res.send("Bienvenido a la API de profesores");
});




app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto: " + PORT);
});