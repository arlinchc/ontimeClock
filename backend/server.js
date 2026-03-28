const express = require('express');
const cors = require('cors');  //permite que react llame a las apis 

const teachersRoutes = require('./routes/teachersRoutes');
const recordsRoutes = require('./routes/recordsRoutes');
const reportsRoutes = require('./routes/reportsRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/teachers', teachersRoutes);
app.use('/api/records', recordsRoutes);
app.use('/api/reports', reportsRoutes);
const PORT = 3000;

app.listen(PORT, () => {
    console.log ("Servidor de backend en puerto " + PORT);
});