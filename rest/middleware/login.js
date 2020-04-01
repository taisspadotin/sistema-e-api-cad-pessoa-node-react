const jwt = require('jsonwebtoken');

exports.obrigatorio = (req, res, next)=>{
	try{
		const token = req.headers.authorization.split(' ')[1];
		//req.body.token
		const decode = jwt.verify(token, process.env.JWT_KEY);
		req.usuario = decode; //para a pessoa poder usar os dados do usuario mais para frente
		next();
	}catch(error){
		return res.status(401).send({mensagem: 'Falha na autenticação'});
	}
	
};

exports.opcional = (req, res, next)=>{
	try{
		const token = req.headers.authorization.split(' ')[1];
		//req.body.token
		const decode = jwt.verify(token, process.env.JWT_KEY);
		req.usuario = decode;
		next();
	}catch(error){
		next();
	}
	
};