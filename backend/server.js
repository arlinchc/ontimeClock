    const express = require("express");
const cors = require("cors"); //Permite que React llame a las API´S

const teachersRoutes = require("./routes/teachersRoutes");

const app = express();

app.use(cors());
app.use(express.json())

app.use("/api/teachers", teachersRoutes);

const PORT = 3000;
   
app.listen(PORT, () => {
    console.log("Servidor de backend en puerto: " + PORT)
})