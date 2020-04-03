const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.cadastraUsuario = (req, res, next)=>{
	mysql.getConnection((error, conn)=>{
		if(error){res.status(500).send({error: error});}//erro de conexao
		conn.query(`SELECT * FROM usuarios WHERE email = ?`, [req.body.email], (error, results)=>{
			if(error){return res.status(500).send({error: error});}
			if(results.length > 0){//ja tem o usuario com esse email
					res.status(409).send({mensagem: 'Usuario já cadastrado'});
			}
			else{
					bcrypt.hash(req.body.senha, 10, (errBcrypt, hash)=>{
					if(errBcrypt){//se deu erro
						return res.status(500).send({error: errBcrypt});
					}
					conn.query(`INSERT INTO usuarios(email, senha) VALUES (?, ?)`, 
					[req.body.email, hash],
					(error, results)=>{
						conn.release();
						if(error){return res.status(500).send({error: error});}
						const response = {
							mensagem: "usuario criado com sucesso",
								usuarioCriado: {
									id_usuario: results.insertId,
									email: req.body.email
								}
						};
						return res.status(201).send(response);
					})
				});//criptografando a senha 
			}
		});
		
	});
};

exports.loginUsuario = (req, res, next)=>{
	mysql.getConnection((error, conn)=>{
		if(error){res.status(500).send({error: error});}
		conn.query(`SELECT * FROM usuarios WHERE email=?`, 
					[req.body.email],
					(error, results)=>{
						conn.release();
						if(error){return res.status(500).send({error: error});}
						if(results.length < 1){
							return res.status(401).send({mensagem: 'Falha na autenticação'});
						}
						bcrypt.compare(req.body.senha, results[0].senha, (error, result)=>{
							if(error){
								return res.status(401).send({
									mensagem: 'Falha na autenticação',
									codigo: 0
									});
							}
							if(result){
								//gerando o token
								const token = jwt.sign({
										id_usuario: results[0].id_usuario,
										email: results[0].email
									}, 
									process.env.JWT_KEY,
									{
										expiresIn: "1h"
									});
								return res.status(200).send({
										mensagem: 'Autenticado com sucesso',
										token: token,
										codigo: 1
									});
							}
							
							return res.status(401).send({
								mensagem: 'Falha na autenticação',
								codigo: 0
								});
						});
					})
	});
};

exports.getUsuarios = (req, res, next)=>{
	mysql.getConnection((error, conn)=>{
		if(error){res.status(500).send({error: error});}//erro de conexao
		 conn.query(`SELECT * FROM usuarios`, (error, results)=>{
			if(error){return res.status(500).send({error: error});}
				conn.release();
					const response = {
							quantidade: results.length,
					usuarios: results.map(row =>{
						return{
							id_usuario: row.id_usuario,
							usuario: row.usuario,
							email: row.email,
							request: {
								tipo: 'GET'
							}
						}
					})
					};
						console.log(response);
						return res.status(201).send(response);
					
			
		});
		
	});
};
