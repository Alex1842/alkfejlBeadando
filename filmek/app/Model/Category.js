'use strict'

const Lucid = use('Lucid')

class Category extends Lucid {
    critics(){
        return this.hasMany('App/Model/Critic')
    }
}

module.exports = Category
