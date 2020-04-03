const mysql = require('../mysql').pool;

exports.getPessoas = (req, res, next)=>{
    const pageOptions = {
		page: parseInt(req.query.page, 10) || 0,
		limit: parseInt(req.query.limit, 10) || 10
	}
	let inicio_busca = ((pageOptions.page)*(pageOptions.limit));
	//console.log(inicio_busca);
	/*res.status(200).send({mansagme: 'get prod'});*/
	//'SELECT SQL_CALC_FOUND_ROWS *, FOUND_ROWS() AS fr FROM pessoas limit ?,?',
	mysql.getConnection((error, conn)=>{
		if(error){res.status(500).send({error: error});}//erro de conexao
		conn.query(
			'SELECT SQL_CALC_FOUND_ROWS *, FOUND_ROWS() AS fr FROM pessoas limit ?,?',
			[inicio_busca, pageOptions.limit],
			(error, result, field)=>{
				if(error){ return res.status(500).send({error: error});}
				//console.log(result);
				
				//CONSULTA PARA PEGAR QUANTOS REGISTROS TEM AO TODO
				conn.query(
				'SELECT COUNT(id_pessoa) AS total FROM pessoas LIMIT 1',
				(error, result_total, field)=>{
					conn.release();
					if(error){ return res.status(500).send({error: error});}
					
					let total = result_total[0].total;
					let tot_pag = Math.ceil((total)/(pageOptions.limit));
					const response = {
					quantidade: result.length,
					pagina: pageOptions.page,
					limite: pageOptions.limit,
					total_registros: total,
					total_paginas: tot_pag,
					pessoas: result.map(pe =>{
						return{
							id_pessoa: pe.id_pessoa,
							nome: pe.nome,
							email: pe.email,
							sobre: pe.sobre,
							telefone: pe.telefone,
							nascimento: pe.nascimento,
							request: {
								tipo: 'GET',
								descricao: 'Retorna todos os detalhes de uma pessoa',
								url: 'http://localhost:3020/pessoas/'+pe.id_pessoa
							}
						}
					})
				};
				return res.status(201).send(response);
				});
				
			}
		);
	});
};

exports.getPessoaDetalhes = (req, res, next)=>{
	const id = req.params.id_pessoa;
	mysql.getConnection((error, conn)=>{
		if(error){res.status(500).send({error: error});}//erro de conexao
		conn.query(
			'SELECT * FROM pessoas WHERE id_pessoa = ?',
			[id],
			(error, result, field)=>{
				conn.release(); //fechando conexao p nao travar
				if(error){ return res.status(500).send({error: error});}
				if(result.length === 0){
					return res.status(404).send({
					mensagem: 'Nenhuma pessoa com esse id encontrado'
				});
				}
				const response = {
					pessoa: {
						id_pessoa: result[0].id_pessoa,
						nome: result[0].nome, 
						email: result[0].email,
						sobre: result[0].sobre,
						nascimento: result[0].nascimento,
						telefone: result[0].telefone,
						request: {
								tipo: 'GET',
								descricao: 'Retorna todos as pessoas',
								url: 'http://localhost:3020/pessoas/'
							}
					}			
						
				};
				return res.status(201).send(response);
			}
		);
	});
	
};

exports.inserePessoa = (req, res, next)=>{
	/*const pessoa = {
		nome: req.body.nome,
		email: req.body.email
	};*/
	console.log(req.body.nome);
	//pegando o usuario logado
	 //console.log(req.usuario)
	mysql.getConnection((error, conn)=>{
		if(error){res.status(500).send({error: error});}//erro de conexao
		conn.query(
			'INSERT INTO pessoas(nome, email) VALUES(?, ?)',
			[req.body.nome, req.body.email],
			(error, result, field)=>{
				conn.release(); //fechando conexao p nao travar
				if(error){ return res.status(500).send({error: error});}
				const response = {
					mensagem: 'Pessoa inserida com sucesso!',
					pessoa_criada: {
						id_pessoa: result.insertId,
						nome: req.body.nome, 
						email: req.body.email
					},
					request: {
								tipo: 'GET',
								descricao: 'Retorna todos as pessoas',
								url: 'http://localhost:3020/pessoas/'
							}
					
				};
				return res.status(201).send(response);
			}
		);
	});
	
};


exports.alteraPessoa = (req, res, next)=>{
	mysql.getConnection((error, conn)=>{
		if(error){res.status(500).send({error: error});}//erro de conexao
		conn.query(
			`UPDATE pessoas 
				SET nome=?, 
				email=?, 
				sobre=?, 
				telefone=?, 
				nascimento=?
				WHERE id_pessoa=?`,
			[req.body.nome, req.body.email, req.body.sobre, req.body.telefone, req.body.nascimento, req.body.id_pessoa],
			(error, result, field)=>{
				conn.release(); //fechando conexao p nao travar
				if(error){ return res.status(500).send({error: error});}
				const response = {
					mensagem: 'Pessoa alterada com sucesso!',
					pessoa_alterada: {
						id_pessoa: req.body.id_pessoa,
						nome: req.body.nome, 
						email: req.body.email,
						sobre: req.body.sobre,
						telefone: req.body.telefone,
						nascimento: req.body.nascimento
					},
					request: {
								tipo: 'GET',
								descricao: 'Retorna uma pessoa',
								url: 'http://localhost:3020/pessoas/'+req.body.id_pessoa
							}
					
				};
				res.status(202).send(response);
			}
		);
	});
	
};

exports.deletaPessoa = (req, res, next)=>{
	mysql.getConnection((error, conn)=>{
		if(error){res.status(500).send({error: error});}//erro de conexao
		conn.query(
			'DELETE FROM pessoas WHERE id_pessoa = ?',
			[req.params.id_pessoa],
			(error, result, field)=>{
				conn.release(); //fechando conexao p nao travar
				if(error){ return res.status(500).send({error: error});}
				const response = {
					mensagem: "Pessoa removida com sucesso",
					request:{
						tipo: "POST",
						descricao: "Insere uma pessoa",
						url: "http://localhost:3020/pessoas/",
						body: {
							nome: 'String',
							email: 'String'
						}
					}
				};
				return res.status(202).send(response);
			}
		);
	});
};