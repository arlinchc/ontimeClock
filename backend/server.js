const express = require("express");
const cors = require("cors"); //Permite que React llame a las API´S

const teachersRoutes = require("./routes/teachersRoutes");



app.use(cors());
app.use(express.json())

app.use("/api/teachers", teachersRoutes);

const PORT = 3000;
   
app.listen(PORT, () => {
    console.log("Servidor de backend en puerto: " + PORT)
})


const schedulesRoutes = require('./routes/schedulesRoutes');
const app = express();


const recordsRoutes = require('./routes/recordsRoutes');
const reportsRoutes = require('./routes/reportsRoutes');


app.use(cors());
app.use(express.json());

app.use('/api/teachers', teachersRoutes);
app.use('/api/schedules', schedulesRoutes);


app.listen(PORT, () => console.log('Backend Server running on port 3000. Access http://localhost:3000/api/teachers'));
app.use('/api/records', recordsRoutes);
app.use('/api/reports', reportsRoutes);


app.listen(PORT, () => {
    console.log ("Servidor de backend en puerto " + PORT);
});
