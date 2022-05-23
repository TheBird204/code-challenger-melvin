const express = require('express')
const palindromo = require('./filesData')
const app = express()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  // res.header("Content-Type", "application/json");
  next()
})

// Data de archivos
app.get('/files/data', async (req, res) => {
  let flag = true
  res.header('Content-Type', 'application/json')

  if (req.query.fileName !== undefined) {
    if (req.query.fileName.length > 0) {
      flag = false
      res.json(await palindromo.getFileInfo(req.query.fileName))
    }
  }

  if (flag) {
    res.json(await palindromo.getDataFiles())
  }
})

// Lista de archivos
app.get('/files/list', async (req, res) => {
  res.header('Content-Type', 'application/json')
  res.json(await palindromo.getFiles())
})

app.listen(3000, () => console.log('Ready'))
