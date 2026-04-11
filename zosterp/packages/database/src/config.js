import { Sequelize } from "sequelize";


export const sequelize = new Sequelize(
  process.env.DB_NAME || "zosterp",
  process.env.DB_USERNAME || "postgres",
  process.env.DB_PASSWORD,
  {
    port: process.env.DB_PORT || 5432,
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: false,
    define: {
      underscored: true,
    },
  },
);
