const mongoose = require('mongoose');
const Cadastro = mongoose.model('cadastro');

// listar
exports.listaCadastro = async (req, res) => {
  try {


let id_buscado = req.query.id;
if(id_buscado!=  undefined){
	//buscar por id especifico:
	Cadastro.find({"_id":id_buscado}).exec(function(err, docs) {
		res.status(200).json(docs);
	});
}
else{
		const pageOptions = {
			page: parseInt(req.query.page, 10) || 0,
			limit: parseInt(req.query.limit, 10) || 10
		}
		let resp= '';
		Cadastro.countDocuments({},function(err,count){
		Cadastro.find({}, null, {
			sort: {
			Name: 1
			}
		}).skip(pageOptions.page  > 0 ? ((pageOptions.page  - 1) * pageOptions.limit) : 0).limit(pageOptions.limit).exec(function(err, docs) {
		if (err)
		  res.json(err);
		else
			console.log(docs);
			
		 resp = {
			"TotalCount": count,
			"paginas": Math.ceil(count/pageOptions.limit),
			"_Array": docs
		  };
		  //console.log(resp);
		  res.status(200).json(resp);
		});
		});
		
	}
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar os cadastros.'});
  }
  
  
  
};

// criar ou atualiza
exports.criaCadastro= async (req, res) => {
  try {
	 console.log(req.body);
	 let corpo = (req.body);
	 //console.log(JSON.parse(corpo));
	 var fim = JSON.parse(corpo);
	 var id_atualiza = fim.id;
	 if(id_atualiza === undefined)
	 {
		const cadastro = new Cadastro({
		  nome: fim.nome,
		  email: fim.email,
		  sobre: fim.sobre,
		  telefone: fim.telefone,
		  nascimento: fim.nascimento
		});

		//console.log(mention)

		await cadastro.save();

		res.status(201).send({message: 'Cadastro realizado com sucesso!'});
	 }
	 else{
		//atualizar
		var data_nascimento = fim.nascimento;
		if(data_nascimento !== undefined && data_nascimento !=='')
		{
			var data  = data_nascimento.split("/");
			var data_formatada = data[2]+'/'+data[1]+'/'+data[0];
		}
		Cadastro.updateOne(
		{"_id" : id_atualiza }, 
		{ $set: 
			{ 
				nome : fim.nome, 
				email: fim.email, 
				sobre: fim.sobre, 
				telefone: fim.telefone,
				nascimento: data_formatada
			}
		}, function(err, obj) {
		if (err) throw err;
		else res.status(201).send({message: 'Dados atualizados com sucesso.'});
   
     });
		
	}
  } catch (e) {
    res.status(500).send({message: 'Operação não realizada. Falha'});
  }
};

//deletar
exports.deletaCadastro= async (req, res) => {
  try {
		let url = require('url');
		var q = url.parse(req.url, true).query;
		var id = q.id;
		console.log(id);
		var myquery = { '_id': id };
		
		Cadastro.deleteOne(myquery, function(err, obj) {
		if (err) throw err;
		console.log("1 document deleted");
   
  });
    res.status(201).send({message: 'Cadastro deletado com sucesso!'});
  } catch (e) {
    res.status(500).send({message: 'Falha ao deletar o cadastro.'});
  }
};