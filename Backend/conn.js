import { createConnection } from "mysql2";

const config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "secretaria",
};

export const conn = createConnection(config);
