const express = require('express')
// Mongoose on kirjasto jolla mongodb:n käsittely on helppoa koodista
const mongoose = require('mongoose')

const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))

// Yhdistä MongoDB
mongoose
  .connect(
    'mongodb://mongo:27017/docker-node-mongo',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log(' -------- MongoDB containeriin saatu yhteys !!!!! ---------------------'))
  .catch(err => console.log(err));

const Item = require('./models/Item')

app.get('/', (req, res) => {
  Item.find()
    .then(items => res.render('index', { items }))
    .catch(err => res.status(404).json({ msg: 'Lokitietoja ei löydy' }))
});

// Lisää uusi loki
app.post('/item/add', (request, response) => {
  const newItem = new Item({
    name: request.body.name
  })

  newItem.save().then(item => response.redirect('/'))
})

// Poista loki
app.post('/item/delete/:id', (request, response) => {
  Item.findByIdAndRemove(request.params.id)
    .then(result => response.redirect('/'))
})


const port = 3000

app.listen(port, () => console.log('Palvelin käynnissä: Localhost (ei portti, koska se on containerissa 80'))
