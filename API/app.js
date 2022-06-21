const express = require('express');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'port-watering',
});

app.use(
  cors({
    origin: '*',
  })
);
app.use(bodyParser.json());

app.get('/watering-api', (req, res) => {
  res.json({
    response: 'ahoj',
  });
});

app.post('/watering-api/pepega', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData,
      });
    }
  });
});

app.post('/watering-api/login', (req, res) => {
  var login_number = req.body.user_number;
  try {
    con.connect((err) => {
      if (err) {
        res.sendStatus(500);
        console.log('connection error');
      }
      con.query(
        'SELECT * FROM user WHERE user_number=' + mysql.escape(login_number),
        (err, result) => {
          if (err) {
            res.sendStatus(500);
            console.log(err);
          }
          if (result[0] && result[0]?.id != undefined) {
            let user = {
              id: result[0]?.id,
              user_number: result[0]?.user_number,
              name: result[0].name,
            };
            jwt.sign({ user }, 'secretkey', (err, token) => {
              res.json({
                token,
                user,
              });
            });
          } else {
            res.sendStatus(500);
          }
        }
      );
    });
  } catch (error) {
    res.sendStatus(500);
  }
});

function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

app.listen(5000, () => {
  console.log('app is running on port 5000');
});
