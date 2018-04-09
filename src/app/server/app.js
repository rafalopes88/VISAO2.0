const express = require('express');
const mapService  = require('./services/mapService');
const IndicadoresService  = require('./services/IndicadoresService');
const InfoGeralService  = require('./services/InfoGeralService');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/api/GetDivisoes', function (req, res) {	
	let mapServiceObj = new mapService(req, res);
	mapServiceObj.GetDivisoes();
});
app.get('/api/AplicarIndicador', function (req, res) {
	let mapServiceObj = new mapService(req, res);
	mapServiceObj.AplicarIndicador(req, res);
});
app.get('/api/GetIndicadores', function (req, res) {
	let IndServiceObj = new IndicadoresService(req, res);
	IndServiceObj.GetIndicadores();
});
app.get('/api/GetAno', function (req, res) {
	let IndServiceObj = new IndicadoresService(req, res);
	IndServiceObj.GetAno();
});
app.get('/api/GetInfoGeral', function (req, res) {
	console.log("Entrou no App.js");
	let InfoGeralServiceObj = new InfoGeralService(req, res);
	InfoGeralServiceObj.GetInfoGeral();
});

app.listen(3000, function () {
  console.log('visão Web app service listening on port 3000!');
});



