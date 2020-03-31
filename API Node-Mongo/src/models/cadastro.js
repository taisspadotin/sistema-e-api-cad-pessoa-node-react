const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  nome: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: false
  },
  sobre: {
    type: String,
    required: false
  },
  telefone: {
    type: String,
    required: false
  },
  nascimento: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('cadastro', schema);
