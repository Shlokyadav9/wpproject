const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 5001;
const conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'hypestore',
    port : 3306
  });
  conn.connect(function(err) {
    if (err) {
    throw err;
    }
    console.log("Database Connected!");
  });

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use(express.json()); //to accept data in json format 



  app.post('/review', (req, res) => {
    console.log("HEllo",req.body)
    var sql= `insert into review(fullname,email,address,city,state,zip,cardname,cardnum,expirym,expiry,cvv) values ("${req.body.fullname}","${req.body.email}","${req.body.address}","${req.body.city}","${req.body.state}","${req.body.zip}","${req.body.cardname}","${req.body.cardnum}","${req.body.expirym}","${req.body.expiry}","${req.body.cvv}")`;
     conn.query(sql, (err, results) => {

        if(err) throw err;
        res.send(results);
      });
  });



  app.get('/review2', (req, res) => {
    var sql= "SELECT * FROM review";
    let query= conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(results);
      });
  });

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});