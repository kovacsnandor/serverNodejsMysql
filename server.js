require("dotenv").config();

const express = require("express");
const mysql = require("mysql");
const app = express();

const pool = require("./config/database.js");

app.get("/cars", (req, res) => {
  
  pool.getConnection(function (error, connection) {
    if (error) {
      console.log("szerver hiba");
      return;
    }
    const sql = "SELECT * FROM cars";
    connection.query(sql, (error, results, fields) => {
      if (error) {
        console.log("sql hiba");
        return;
      }
      res.send(results);
    });
    connection.release();
  });
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Data server, listen port: ${process.env.APP_PORT}`);
});
