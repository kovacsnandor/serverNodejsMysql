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

app.get("/cars/:id",(req, res)=>{
  const id = req.params.id;
  pool.getConnection(function (error, connection) {
    if (error) {
      console.log("szerver hiba");
      return;
    }
  //   const sql = `
  //   SELECT * FROM cars
  // WHERE id = ${id}
  //   `;
  const sql = `
    SELECT * FROM cars
  WHERE id = ?
  `;
    connection.query(sql, [id], (error, results, fields) => {
      if (error) {
        console.log("sql hiba");
        return;
      }
      res.send(results[0]);
    });
    connection.release();
  });
});


app.listen(process.env.APP_PORT, () => {
  console.log(`Data server, listen port: ${process.env.APP_PORT}`);
});
