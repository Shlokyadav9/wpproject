const express = require('express');
const bodyParser = require('body-parser');
const mysql=require('mysql');
// create express app
const app = express();
// Setup server port
const port = 5000;
const conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'hypestore',
    port    :   3306
  });
  conn.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
  });
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse requests of content-type - application/json
app.use(bodyParser.json())

app.post("/register", (req, res) => {
  const user = req.body;
  if(user["password"] == user["confirm"]) {
      let query = "select * from users";
      conn.query(query, (err, result) => {
          if(err) {
              res.write(err);
          }
          if(Object.keys(result).length === 0) {
              query = "insert into users values('" + user["name"] + "', '" + user["username"] + "', '" + user["email"] + "', '" + user["password"] + "')";
              conn.query(query, (err, result) => {
                  if(err) {
                      res.write(err);
                  }
                  res.write("<h1>Form Submitted</h1>");
                });
          }
          else {
              for(const users in result) {
                  if(result[users]["username"] == user["username"]) {
                      res.write("Username taken!");
                      return;
                  }
                  query = "insert into users values('" + user["name"] + "', '" + user["username"] + "', '" + user["email"] + "', '" + user["password"] + "')";
                  conn.query(query, (err, result) => {
                      if(err) {
                          res.write(err);
                      }
                      res.write("<h1>Form Submitted</h1>");
                  });
              }
          }
      });
  }

});

app.listen(5000, (err) => {
  if(err) {
    throw err;
  }
  console.log("Connected");
});

