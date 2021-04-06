var Registos = require('../models/registoModels');

//index
exports.index = function(req, res){
	res.send('Olá, Acesso feito com sucesso!');
};

//Crear
exports.create = function (req, res) {
    let registo = new Registos({
		nome: req.body.nome,
		email: req.body.email,
		telef: req.body.telefone,
		morada: req.body.morada,
	});

    //Guardar e verificar erros
    registo.save(function(err) {
        if (err){
			throw err;
		}
        res.send("Novo Registo Adicionado!")
    })
};

//Pesquisar por id
exports.details = function(req, res){
	Registos.findById(req.params.id, function(err, registo){
		if(err){
			throw err;			
		}
		res.send(registo);
	})	
};

// Atualizar
exports.update = function(req, res){
	//metodo mongoose para atualizar um documento existente
	let id = req.params.id;
	
	Registos.findById(id, function (err, registo) {
        if (err)
            res.send(err);
        registo.nome = req.body.nome ? req.body.nome : registo.nome;
        registo.email = req.body.email ? req.body.email : registo.email;
        registo.telef = req.body.telef ? req.body.telef : registo.telef;
        registo.morada = req.body.morada ? req.body.morada : registo.morada;

        //Guardar e verificar erros
        registo.save(function (err) {
            if(err){
				throw err;			
			}
			res.send("Registo Atualizado Com sucesso");
        });
    });
};

// Apagar
exports.delete = function (req, res) {
    Registos.deleteOne({
        _id: req.params.id
    }, function (err, contact) {
        if(err){
			throw err;			
		}
		res.send("Registo Apagado Com sucesso");
    });
};