const express = require('express')
, bodyParser = require('body-parser');
const app = express()
const port = 3000
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/lanche', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

var LancheSchema = new mongoose.Schema({
    name: String,
    preco: String,
    vegano: Boolean
  });

var Lanche = mongoose.model('Lanche', LancheSchema);

app.use(bodyParser.json());

app.post('/solicitaLanche', function(request, response){
  var nameSolicitado = request.body.name;
  var precoSolicitado = request.body.preco;
  var veganoSolicitado = request.body.vegano;

  var Pedido = new Lanche({ name: nameSolicitado, preco: precoSolicitado, vegano: veganoSolicitado });
  Pedido.save(function (err, Pedido) {
    if (err) return console.error(err);
  });
  response.send("Pedido Criado com Sucesso"); 
});

app.get('/consultaTodosLanches', function(request, response){
    Lanche.find(function (err, Lanche) {
        if (err) return console.error(err);
        response.send(Lanche);
      })
});

app.get('/consultaLanche', function(request, response){
    var nameSolicitado = request.query;
    Lanche.find(nameSolicitado, function (err, Lanche) {
        if (err) return console.error(err);
        response.send(Lanche);
      });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))