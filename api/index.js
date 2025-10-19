require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const cors = require("cors");
const PORT = 3000;
const server = express();
const { authlimiter, apiLimiter } = require('./middlewares/rateLimit/rateLimiting');
const {validateUser} = require('./middlewares/validation/validateUser');
const {authRole} = require('./middlewares/authorization/authRole');
const {authToken} = require('./middlewares/auth/authToken');
server.use(express.json());

server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);
server.use('/register', authlimiter);
server.use('/login', authlimiter);
server.use('/', apiLimiter);

//e.g endpoints
server.post('/register', validateUser, (req, res) => {
  res.send('user registered!');
});
server.post('/login', validateUser, (req, res) => {
  res.send('user loged!');
});
server.get('/clientes', authToken, authRole('clientes', 'read'), (req, res) => {
  res.send(`clients: {name: "Guillermo", surname: "Francella"}`);
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
