import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "secretaria",
};

export const conn = await mysql.createPool(config);
