require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const cors = require("cors");
const PORT = 3000;
const server = express();
const { authlimiter, apiLimiter } = require('./middlewares/rateLimit/rateLimiting');

// Importar rutas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const clientRoutes = require('./routes/clients');
const projectRoutes = require('./routes/projects');

server.use(express.json());

server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

server.use('/auth/register', authlimiter);
server.use('/auth/login', authlimiter);
server.use('/api', apiLimiter);

// Usar rutas
server.use('/auth', authRoutes);
server.use('/users', userRoutes);
server.use('/clients', clientRoutes);
server.use('/projects', projectRoutes);

// Ruta de prueba
server.get('/clientes', (req, res) => {
  res.json({ clients: [{ name: "Guillermo", surname: "Francella" }] });
});

// Ruta de salud (healthy route)
server.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor funcionando correctamente' });
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Base de datos iniciada con éxito");
    server.listen(PORT, () =>
      console.log(`Servidor corriendo en: http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.log("Error: ", error));