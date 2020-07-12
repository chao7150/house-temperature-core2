import mysql from "mysql";

export const connection = mysql.createConnection({
  host: "db",
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: "temperature",
});

connection.connect((error) => {
  if (error) {
    console.error("error connecting: " + error.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

connection.query(
  "create table if not exists temp (date DATETIME, temperature decimal(4,1), humidity decimal(4,1), pressure decimal(7,1))",
);
