const express = require('express');
const app = express();
const fs = require('fs');
const databaseFile = './data.json';

app.set('view engine', 'ejs');
app.use(express.json());
let database = []

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/data', (req, res) => {
    fs.readFile(databaseFile, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        database = JSON.parse(data);
        res.redirect('/list');
      }
    });
});

app.get('/redirect', (req, res) => {
  res.redirect('/');
});

app.get('/list', (req, res) => {
    res.render('list', { data: database });
});

app.use((req, res) => {
  res.render('error');
});

app.use(express.static(__dirname + '/public' + 'style.css'));

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});