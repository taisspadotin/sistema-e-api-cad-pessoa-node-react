const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const login = require('../middleware/login');//para proteger a rota
//TODAS AS PESSOAS
router.get('/', (req, res, next)=>{
	/*res.status(200).send({mansagme: 'get prod'});*/
	mysql.getConnection((error, conn)=>{
		if(error){res.status(500).send({error: error});}//erro de conexao
		conn.query(
			'SELECT * FROM pessoas',
			(error, result, field)=>{
				conn.release(); //fechando conexao p nao travar
				if(error){ return res.status(500).send({error: error});}
				const response = {
					quantidade: result.length,
					pessoas: result.map(pe =>{
						return{
							id_pessoa: pe.id_pessoa,
							nome: pe.nome,
							email: pe.email,
							request: {
								tipo: 'GET',
								descricao: 'Retorna todos os detalhes de uma pessoa',
								url: 'http://localhost:3020/pessoas/'+pe.id_pessoa
							}
						}
					})
				};
				return res.status(201).send(response);
			}
		);
	});
});

//INSERE PESSOA
router.post('/', login.obrigatorio, (req, res, next)=>{
	/*const pessoa = {
		nome: req.body.nome,
		email: req.body.email
	};*/
	//pegando o usuario logado
	console.log(req.usuario)
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
	
});

//BUSCA UMA PESSOA
router.get('/:id_pessoa', (req, res, next)=>{
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
	
});

//ALTERA UMA PESSOA
router.patch('/', (req, res, next)=>{
	mysql.getConnection((error, conn)=>{
		if(error){res.status(500).send({error: error});}//erro de conexao
		conn.query(
			`UPDATE pessoas 
				SET nome=?, email=? 
				WHERE id_pessoa=?`,
			[req.body.nome, req.body.email, req.body.id_pessoa],
			(error, result, field)=>{
				conn.release(); //fechando conexao p nao travar
				if(error){ return res.status(500).send({error: error});}
				const response = {
					mensagem: 'Pessoa alterada com sucesso!',
					pessoa_alterada: {
						id_pessoa: req.body.id_pessoa,
						nome: req.body.nome, 
						email: req.body.email
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
	
});

//DELETA PESSOA
/*router.delete('/', (req, res, next)=>{
	console.log(req.query.id_pessoa);
	mysql.getConnection((error, conn)=>{
		if(error){res.status(500).send({error: error});}//erro de conexao
		conn.query(
			'DELETE FROM pessoas WHERE id_pessoa = ?',
			[req.query.id_pessoa],
			(error, result, field)=>{
				conn.release(); //fechando conexao p nao travar
				if(error){ return res.status(500).send({error: error});}
				res.status(202).send({
					mensagem: 'Pessoa Excluida'
				});
			}
		);
	});
});*/
router.delete('/:id_pessoa', (req, res, next)=>{
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
});


module.exports = router;