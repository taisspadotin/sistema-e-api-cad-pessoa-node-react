const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const login = require('../middleware/login');//para proteger a rota
const pessoasController = require('../controllers/pessoas-controller');//para o controller

//TODAS AS PESSOAS
router.get('/', pessoasController.getPessoas);

//INSERE PESSOA
router.post('/', login.obrigatorio, pessoasController.inserePessoa);

//BUSCA UMA PESSOA
router.get('/:id_pessoa', pessoasController.getPessoaDetalhes);

//ALTERA UMA PESSOA
router.patch('/', pessoasController.alteraPessoa);

//DELETA PESSOA
router.delete('/:id_pessoa', pessoasController.deletaPessoa);


module.exports = router;