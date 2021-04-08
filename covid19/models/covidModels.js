const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Covid19Schema = Schema({
	data: {
        type: String,
        required: true
    },
    novoscasos: {
        type: Number,
        required: true
    },
    internadosCI: {
        type: Number,
        required: true
    },
	confirmados: {
        type: Number,
        required: true
    },
});

//Exportar o modelo
module.exports = mongoose.model('Covid19', Covid19Schema);