const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuariosController = require('../controllers/usuarios-controller');//para o controller

//Listando os usuarios:
router.get('/', usuariosController.getUsuarios);

router.post('/cadastro', usuariosController.cadastraUsuario);

router.post('/login', usuariosController.loginUsuario);

module.exports = router;