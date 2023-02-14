const express = require('express');
const mysql = require("mysql");
const app = express();

app.get('/cars', (req, res) => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'taxi6'
  });

  connection.connect();

  const sql = 'SELECT * FROM cars';
  connection.query(sql, (error, results, fields)=>{
    if (error) {
        console.log(error);
        return;
    }
    res.send(results);
  })

  connection.end();

});

app.listen(3000, ()=>{
    console.log("Data server, listen port: 3000");
})
  