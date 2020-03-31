const express = require('express');
const router = express.Router();
const cadastroController = require('../controllers/cadastro-controller');

router.get('/', cadastroController.listaCadastro);
router.post('/', cadastroController.criaCadastro);
router.delete('/', cadastroController.deletaCadastro);

module.exports = router;
