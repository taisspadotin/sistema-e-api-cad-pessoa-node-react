'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PessoaSchema extends Schema {
  up () {
    this.create('clientes', (table) => {
         table.increments()
      table.string('name', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('clientes')
  }
}

module.exports = PessoaSchema


/*'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
/*const Schema = use('Schema')

class ClienteSchema extends Schema {
  up () {
    this.create('clientes', (table) => {
        table.increments()
        table.string('nome').notNullable()
        table.string('email').notNullable()
        table.timestamps()
    })
  }

  down () {
    this.drop('clientes')
  }
}

module.exports = ClienteSchema
*/