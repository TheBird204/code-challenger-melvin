const express = require('express')
const palindromo = require('./palindromo')
const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Palindromo
app.get('/iecho', (req, res) => {
  res.json(palindromo.get(req.query.text))
})

app.listen(3000, () => console.log('Ready'))
