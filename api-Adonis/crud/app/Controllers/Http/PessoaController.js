'use strict'
const pessoas = use("App/Models/Pessoa");
class PessoaController {
    constructor(){
		this.pessoas = use("App/Models/Pessoa");
		
  
	}

	async index({ request, response, view }) {
		//get
		//console.log(request)
		//if((request._raw.length)> 0){
		//let corpo = JSON.parse(request._raw);
		//let id_buscado = corpo.id;
		console.log(request);
		let id_buscado = request.url.id;
		if(id_buscado !=  undefined ){
			//buscar por id especifico:
			   // this.pessoas.find({"id":id_buscado}).exec(function(err, docs) {
				//res.status(200).json(docs);
			//});
			console.log(id_buscado);
			this.pessoas.query('SELECT * FROM pessoas WHERE id='+id_buscado+' LIMIT 1', (err, res) => {
				  if (err) {
					console.log(err.stack)
				  } else {
					  console.log((res.rows[0]));
					return (res.rows[0]);
				  }
				})
		//}
		}
		else{
			//buscar todos:
			const pessoas = await this.pessoas.all();
			
			
			response.header("Content-Type",'application/json');
			response.header("Access-Control-Allow-Origin", "http://localhost:3000");
			response.header("Access-Control-Allow-Origin", "*");
			response.header("Access-Control-Allow-Methods", "*");
			return pessoas;
		}
		
	}

	async store({ request, response }) {
		
		let data = request.only(["nome", "email"]);
		var date = new Date();
		data.updated_at= date;
		data.created_at= date;
		
		//console.dir(data);
		let corpo = JSON.parse(request._raw);
		
		//console.dir(corpo);
		//console.dir(response.dataParse);
		data.nome = corpo.nome;
		data.email = corpo.email;
		data.sobre = corpo.sobre;
		data.telefone = corpo.telefone;
		const pessoas = await this.pessoas.create(data);
		
		return pessoas;
	}

	async update({ params, request, response }) {
		const pessoas = await this.pessoas.findOrFail(params.id);
		const data = request.only(["nome", "email"]);
		
		pessoas.merge(data);
		await pessoas.save();
		
		return pessoas
	}

	async destroy({ params, request, response }) {
		const pessoas = await this.pessoas.findOrFail(params.id);
		await pessoas.delete();
	}
}
module.exports = PessoaController;

