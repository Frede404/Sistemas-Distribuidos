const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RegistoSchema = Schema({
	nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telef: {
        type: String,
        required: true
    },
    morada: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

//Exportar o modelo
module.exports = mongoose.model('Registo', RegistoSchema);