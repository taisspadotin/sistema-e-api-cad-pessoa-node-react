'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PessoaSchema extends Schema {
  up () {
    this.create('pessoas', (table) => {
      table.increments()
      table.string('nome', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('sobre', 60).notNullable()
	  table.string('telefone', 60).notNullable()
	  table.string('nascimento', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('pessoas')
  }
}

module.exports = PessoaSchema
