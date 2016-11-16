'use strict'

const Schema = use('Schema')

class CriticsTableSchema extends Schema {

  up () {
    this.create('critics', (table) => {
      table.increments()
      table.string('title', 60).notNullable()
      table.string('description', 500)
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('category_id').unsigned().references('id').inTable('categories')
      table.timestamps()
    })
  }

  down () {
    this.drop('critics')
  }

}

module.exports = CriticsTableSchema
