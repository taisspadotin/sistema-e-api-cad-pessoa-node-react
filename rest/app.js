const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
//rotas
const rotaPessoas = require('./routes/pessoas');
app.use(cors());
app.use(morgan('dev'));//MOSTRA O LOG DE GET, POST ...
app.use(bodyParser.urlencoded({extended: false}));//apenas dados simples
app.use(bodyParser.json()); //json de entrada no body

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
			'Access-Control-Allow-Header', 
			'Origin, X-Requested-With, Content-Type, Accept, Authorization'
		);
		if(req.method === 'OPTIONS'){
			res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
			return res.status(200).send({});
		}
	next();	
});

app.use('/pessoas', rotaPessoas);

/*app.use('/teste', (req, res, next)=>{
	res.status(200).send({mensagem: 'ok'});
});*/

app.use((req, res, next)=>{
	const erro = new Error('Não Encontradoo!');
	erro.status = 404;
	next(erro);
});//QUANDO FOR UMA ROTA DESCONHECIDA

app.use((error, req, res, next)=>{
	res.status(error.status || 500);
	return res.send({
		erro:{
			mensagem: error.message
		}
	});//envia a mensagem de erro
});
module.exports = app;