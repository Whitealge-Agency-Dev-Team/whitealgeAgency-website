require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const cors = require("cors");
const PORT = 3000;
const server = express();
const { authlimiter, apiLimiter } = require('./middlewares/rateLimit/rateLimiting');
const {defaultUser} = require('./helpers/defaultUser');
// Importar rutas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const clientRoutes = require('./routes/clients');
const projectRoutes = require('./routes/projects');
const statusRoutes = require('./routes/status');

server.use(express.json());

const ALLOWED_ORIGINS = (process.env.CORS_ORIGIN || "http://localhost:5173").split(",").map(s => s.trim());
server.use(
  cors({
    origin: ALLOWED_ORIGINS,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

server.use('/auth/invite-worker', authlimiter);
server.use('/auth/login', authlimiter);
server.use('/api', apiLimiter);

// Usar rutas
server.use('/auth', authRoutes);
server.use('/users', userRoutes);
server.use('/clients', clientRoutes);
server.use('/projects', projectRoutes);
server.use('/status', statusRoutes);

// Ruta de salud (healthy route)
server.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor funcionando correctamente' });
});

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Base de datos iniciada con éxito");
    server.listen(PORT, async () =>
      await defaultUser()      
    );
  })
  .catch((error) => console.log("Error: ", error));
