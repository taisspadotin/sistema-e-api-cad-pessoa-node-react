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
	const pageOptions = {
		page: parseInt(req.query.page, 10) || 0,
		limit: parseInt(req.query.limit, 10) || 10
	}
	let inicio_busca = ((pageOptions.page)*(pageOptions.limit));
	
	mysql.getConnection((error, conn)=>{
		if(error){res.status(500).send({error: error});}//erro de conexao
		 conn.query(`SELECT * FROM usuarios limit ?,?`,
		 [inicio_busca, pageOptions.limit],
		 (error, results)=>{
			if(error){return res.status(500).send({error: error});}
				//conn.release();
				conn.query(
				'SELECT COUNT(id_usuario) AS total FROM usuarios LIMIT 1',
				(error, result_total, field)=>{
					conn.release();
					if(error){ return res.status(500).send({error: error});}
					
					let total = result_total[0].total;
					let tot_pag = Math.ceil((total)/(pageOptions.limit));
					
					const response = {
							quantidade: results.length,
							pagina: pageOptions.page,
							limite: pageOptions.limit,
							total_registros: total,
							total_paginas: tot_pag,
							usuarios: results.map(row =>{
							return{
								id_usuario: row.id_usuario,
								usuario: row.usuario === null ? '': row.usuario,
								email: row.email === null ? '': row.email,
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
		
	});
};


exports.getUsuarioDetalhes = (req, res, next)=>{
	mysql.getConnection((error, conn)=>{
		if(error){res.status(500).send({error: error});}//erro de conexao
		conn.query(
			'SELECT * FROM usuarios WHERE id_usuario = ?',
			[req.params.id_usuario],
			(error, result, field)=>{
				conn.release(); 
				if(error){ return res.status(500).send({error: error});}
				if(result.length === 0){
					return res.status(404).send({
					mensagem: 'Nenhum usuário com esse id encontrado'
				});
				}
				const response = {
					usuario: {
						id_usuarios: result[0].id_usuario,
						usuario: result[0].usuario === null ? '' : result[0].usuario, 
						email: result[0].email === null ? '' : result[0].email
					}			
						
				};
				return res.status(201).send(response);
			}
		);
	});
	
};

exports.alteraUsuario = (req, res, next)=>{
	mysql.getConnection((error, conn)=>{
		if(error){res.status(500).send({error: error});}//erro de conexao
		conn.query(
			`UPDATE usuarios SET
				usuario = ?,
				email = ?
			WHERE id_usuario = ?`,
			[req.body.usuario, req.body.email, req.params.id_usuario],
			(error, result, field)=>{
				conn.release(); 
				if(error){ return res.status(500).send({error: error});}
				const response = {
					mensagem: 'Usuario alterado com sucesso!',
					usuarioCriado: {
						id_usuario: req.params.id_usuario,
						usuario: req.body.usuario, 
						email: req.body.email
					}			
						
				};
				return res.status(201).send(response);
			}
		);
	});
	
};