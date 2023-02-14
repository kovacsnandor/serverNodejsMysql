require("dotenv").config();


const express = require('express');
const mysql = require("mysql");
const app = express();

const pool = require("./config/database.js");

app.get('/cars', (req, res) => {
  const sql = 'SELECT * FROM cars';
  pool.query(sql, (error, results, fields)=>{
    if (error) {
        console.log(error);
        return;
    }
    res.send(results);
  })

});

app.listen(process.env.APP_PORT, ()=>{
    console.log(`Data server, listen port: ${process.env.APP_PORT}`);
})
  