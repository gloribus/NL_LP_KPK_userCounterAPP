const express = require('express')
const app = express()
const port = 3000
const store = require('data-store')({ path: process.cwd() + '/storage.json' });

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
next();
});
app.get('/users', (req, res) => {
  res.status(200).send(store.get('count').toString());
})

app.post('/users', (req, res) => {
  if(req.body.fio && req.body.fio.length > 3) {
    console.log(req.body.fio);
    store.set({ count: parseInt(store.get('count')) + 1 });
    res.status(200).send('New count: ' + store.get('count').toString());
  } else res.status(200).send('ok');
})

app.get('/users-edit', (req, res) => {
  if(req.query.pass === 'CzaJWW5UbEfB') {
    store.set({ count: req.query.count });  
    res.status(200).send('Edited on ' + store.get('count').toString());
  } else res.status(404);

})

app.listen(port, () => {
  console.log(`Started on :${port}`)
})
