const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
//TODAS AS PESSOAS
router.get('/', (req, res, next)=>{
	/*res.status(200).send({mansagme: 'get prod'});*/
	mysql.getConnection((error, conn)=>{
		if(error){res.status(500).send({error: error});}//erro de conexao
		conn.query(
			'SELECT * FROM pessoas',
			(error, resultado, field)=>{
				conn.release(); //fechando conexao p nao travar
				if(error){ return res.status(500).send({error: error});}
				
				return res.status(201).send({
					response: resultado
				});
			}
		);
	});
});

//INSERE PESSOA
router.post('/', (req, res, next)=>{
	/*const pessoa = {
		nome: req.body.nome,
		email: req.body.email
	};*/
	mysql.getConnection((error, conn)=>{
		if(error){res.status(500).send({error: error});}//erro de conexao
		conn.query(
			'INSERT INTO pessoas(nome, email) VALUES(?, ?)',
			[req.body.nome, req.body.email],
			(error, resultado, field)=>{
				conn.release(); //fechando conexao p nao travar
				if(error){ return res.status(500).send({error: error});}
				res.status(201).send({
					mensagem: 'Pessoa criado',
					id_pessoa: resultado.insertId
				});
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
			(error, resultado, field)=>{
				conn.release(); //fechando conexao p nao travar
				if(error){ return res.status(500).send({error: error});}
				
				return res.status(201).send({
					response: resultado
				});
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
			(error, resultado, field)=>{
				conn.release(); //fechando conexao p nao travar
				if(error){ return res.status(500).send({error: error});}
				res.status(202).send({
					mensagem: 'Pessoa alterada'
				});
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
			(error, resultado, field)=>{
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
			(error, resultado, field)=>{
				conn.release(); //fechando conexao p nao travar
				if(error){ return res.status(500).send({error: error});}
				res.status(202).send({
					mensagem: 'Pessoa Excluida'
				});
			}
		);
	});
});


module.exports = router;