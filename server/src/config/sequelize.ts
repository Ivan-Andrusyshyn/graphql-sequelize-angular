import dotenv from "dotenv";
const Sequelize = require("sequelize");

dotenv.config();

export const sequelize = new Sequelize(
  "node-complete",
  process.env.DATABASE_USERNAME,
  process.env.SQL_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);
