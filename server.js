require("dotenv").config();

const express = require("express");
const mysql = require("mysql");
const app = express();

const pool = require("./config/database.js");

//#region middlewares
app.use(express.json());
//#endregion middlewares

//#region cars
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

app.get("/cars/:id", (req, res) => {
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

app.post("/cars", (req, res) => {
  console.log(req.body);
  const newR = {
    name: req.body.name,
    licenceNumber: req.body.licenceNumber,
    hourlyRate: req.body.hourlyRate,
  };

  pool.getConnection(function (error, connection) {
    if (error) {
      console.log("szerver hiba");
      return;
    }
    const sql = `
    INSERT INTO cars
      (name, licenceNumber, hourlyRate)
      VALUES
      (?, ?, ?)
    `;
    connection.query(
      sql,
      [newR.name, newR.licenceNumber, newR.hourlyRate],
      (error, results, fields) => {
        if (error) {
          console.log("sql hiba");
          return;
        }
        if (!results.affectedRows) {
          console.log("insert meghiúsult");
          return;
        }
        newR.id = results.insertId;
        res.send(newR);
      }
    );
    connection.release();
  });
});

//update
app.put("/cars/:id", (req, res) => {
  const id = req.params.id;
  const newR = {
    name: req.body.name,
    licenceNumber: req.body.licenceNumber,
    hourlyRate: req.body.hourlyRate,
  };
  pool.getConnection(function (error, connection) {
    if (error) {
      console.log("szerver hiba");
      return;
    }

    const sql = `
    UPDATE cars SET
    name = ?,
    licenceNumber = ?,
    hourlyRate = ?
    WHERE id = ?
  `;
    connection.query(
      sql,
      [newR.name, newR.licenceNumber, newR.hourlyRate, id],
      (error, results, fields) => {
        if (error) {
          console.log("sql hiba");
          return;
        }
        if (!results.affectedRows) {
          res.send(`Not found id: ${id}`);
          return;
        }
        newR.id = id;
        res.send(newR);
      }
    );
    connection.release();
  });
});

app.delete("/cars/:id", (req, res) => {
  const id = req.params.id;
  pool.getConnection(function (error, connection) {
    if (error) {
      console.log("szerver hiba");
      return;
    }

    const sql = `
    DELETE from cars
  WHERE id = ?
  `;
    connection.query(sql, [id], (error, results, fields) => {
      if (error) {
        console.log("sql hiba");
        return;
      }
      if (!results.affectedRows) {
        res.send(`Not found id: ${id}`);
        return;
      }
      res.send({ id: id });
    });
    connection.release();
  });
});

//#endregion cars

app.listen(process.env.APP_PORT, () => {
  console.log(`Data server, listen port: ${process.env.APP_PORT}`);
});
