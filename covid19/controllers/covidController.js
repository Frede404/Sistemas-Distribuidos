var Covid = require('../models/covidModels');
var fs = require("fs");

//index
exports.index = function(req, res){
	res.send('Olá, Api de Covid19 Acesso feito com sucesso!');
};

//import
exports.import = function (req, res) {
   // First read existing users.
   fs.readFile( /*__dirname +*/ "./" + "informacao.json", 'utf8', function (err, doc) {
	   if (err){
			throw err;
		}
      var info = JSON.parse( doc );
	  
	  let inicio = 397;
	  
	  for(i=inicio; i<inicio+5; i++){
		/*let novos_casos = info.confirmados_novos[i];
		let confirmados = info.confirmados[i];
		let internadosCI = info.internados_uci[i];
		let data = info.data[i];
		console.log( 'novos '+novos_casos );
		console.log( 'confirmados '+confirmados );
		console.log( 'internadosCI '+internadosCI );
		console.log( 'data '+data );*/
		
		let covid = new Covid({
			data: info.data[i],
			novoscasos: info.confirmados_novos[i],
			internadosCI: info.internados_uci[i],
			confirmados: info.confirmados[i]
		})
		
		console.log( covid );
		covid.save(function(err){
			if(err) throw err;
		});
	  }
	  
      res.send( 'Importado com sucesso!');
   });
};

exports.novos_casos_dia = function(req, res){
	Covid.find({},{_id: 0, data: 1, novoscasos: 1},function(err, covid){
		if(err){
			throw err;			
		}
		
		console.log( covid );
		res.send(covid);
	})	
};

exports.uci_diarios = function(req, res){
	Covid.find({},{_id: 0, data: 1, internadosCI: uci},function(err, covid){
		if(err){
			throw err;			
		}
		
		console.log( covid );
		res.send(covid);
	})	
};

exports.ordenarcasos = function(req, res){
	var ordenar = ''
	
	if(req.params.ordem==1){
		ordenar = 'novoscasos'
	}
	else{
		ordenar = '-novoscasos'
	}

	Covid.findOne({},{_id: 0, data: 1, novoscasos: 1})
		.sort(ordenar)
		.exec(function(err, covid){
			if(err){
				throw err;			
			}
			
			console.log(covid);
			res.send(covid);
	})
};

exports.media =function(req, res){
	Covid.aggregate([
		{$group: {"_id":"",media: {$avg: '$novoscasos'}}}
		], function (err, covid) {
			if(err){
				throw err;			
			}
			
			console.log('media: ' + covid[0].media );
			res.send('media: ' + covid[0].media);
		});
};


// Apagar tudo
exports.delete = function (req, res) {
    Covid.remove(function (err) {
        if(err){
			throw err;			
		}
		res.send("Todos os dados apagados com sucesso");
    });
};