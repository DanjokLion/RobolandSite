import { DB } from '../db'
import { Sequelize } from  'sequelize'

const sequelize = require('sequelize')

const MODEL_NAME = 'courses';

export const Model = DB.define( MODEL_NAME, {
  title: {
    type: sequelize.STRING
  },
  link: {
    type: sequelize.STRING
  },
  picture: {
    type: sequelize.STRING
  },
  anons: {
    type: sequelize.STRING
  },
  content: {
    type: sequelize.STRING
  },
  meta_keywords:{
    type: sequelize.STRING
  },
  meta_description:{
    type: sequelize. STRING
  },

});


export { Model as CoursesModel }
