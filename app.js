const express = require('express')
const app = express()
const port = 3000
const store = require('data-store')({ path: process.cwd() + '/storage.json' });

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/kpk_lead', (req, res) => {
  res.status(200).send(store.get('count').toString());
})

app.post('/kpk_lead', (req, res) => {
  if(req.body.fio.length > 3) {
    console.log(req.body.fio);
    store.set({ count: store.get('count') + 1 });
    res.status(200).send('New count: ' + store.get('count').toString());
  } else res.status(404);
})

app.get('/kpk_lead-edit', (req, res) => {
  if(req.query.pass === 'CzaJWW5UbEfB') {
    store.set({ count: req.query.count });  
    res.status(200).send('Edited on ' + store.get('count').toString());
  } else res.status(404);

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})