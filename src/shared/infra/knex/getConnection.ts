import knex from "knex";
import dotenv from "dotenv";
const config = require("./knexfile");

dotenv.config();

export default function getConnection() {
  return knex(config["development"]);
}
