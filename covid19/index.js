const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const covid = require('./routes/covidRoutes');//importar rota

const app = express(); // iniciar express

let url = `mongodb://localhost:27017/Covid19`;

let mongoDB = process.env.MONGODB_URI || url;
mongoose.connect(mongoDB,{
	useNewUrlParser: true,
	useUnifiedTopology: true
});

mongoose.Promise = global.Promise;

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro na ligação ao MongoDB'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', covid);

let porto = 8081;

app.listen(porto, () => {
	console.log('Servidor a executar no porto ' + porto);
});