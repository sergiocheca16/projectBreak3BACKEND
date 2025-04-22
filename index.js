const express = require('express');
const cors = require('cors');
require('dotenv').config();
const dbConnection = require('./config/config');

const authRoutes = require('./routes/auth.routes');
const appointmentRoutes = require('./routes/appointment.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);

app.get('/', (req, res) => {
    res.send('API Clínica Dental 🦷');
});

dbConnection();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express esta escuchando en el puerto http://localhost:${PORT} ✅`));
