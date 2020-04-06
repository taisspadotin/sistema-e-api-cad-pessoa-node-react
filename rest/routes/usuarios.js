const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuariosController = require('../controllers/usuarios-controller');//para o controller

//LISTA OS USUARIOS
router.get('/', usuariosController.getUsuarios);

//CADASTRA UM USUARIO
router.post('/cadastro', usuariosController.cadastraUsuario);

//LOGA O USUARIO
router.post('/login', usuariosController.loginUsuario);

//PEGA DADOS DE UM USUARIO
router.get('/:id_usuario', usuariosController.getUsuarioDetalhes);

//ALTERA UM USUARIO
router.patch('/:id_usuario', usuariosController.alteraUsuario);

module.exports = router;