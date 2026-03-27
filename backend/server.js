const express = require('express');
const cors = require('cors');

const teachersRoutes = require('./routes/teachersRoutes');
const schedulesRoutes = require('./routes/schedulesRoutes');
const app = express();


app.use(cors());
app.use(express.json());

app.use('/api/teachers', teachersRoutes);
app.use('/api/schedules', schedulesRoutes);

const PORT = 3000;

app.listen(PORT, () => console.log('Backend Server running on port 3000. Access http://localhost:3000/api/teachers'));
