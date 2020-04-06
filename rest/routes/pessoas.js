const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const login = require('../middleware/login');//para proteger a rota
const pessoasController = require('../controllers/pessoas-controller');//para o controller


//BUSCA UMA PESSOA PARA AUTOCOMPLETE
router.get('/auto_pessoa', pessoasController.autocompletePessoa);

//TODAS AS PESSOAS
router.get('/', pessoasController.getPessoas);

//INSERE PESSOA
//router.post('/', login.obrigatorio, pessoasController.inserePessoa);
router.post('/', pessoasController.inserePessoa);

//BUSCA UMA PESSOA
router.get('/:id_pessoa', pessoasController.getPessoaDetalhes);

//ALTERA UMA PESSOA
router.patch('/:id_pessoa', pessoasController.alteraPessoa);

//DELETA PESSOA
router.delete('/:id_pessoa', pessoasController.deletaPessoa);


module.exports = router;