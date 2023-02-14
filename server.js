const express = require('express');
const app = express();

app.get('/cars', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, ()=>{
    console.log("Data server, listen port: 3000");
})
  