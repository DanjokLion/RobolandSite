import { DB } from '../db'
import { Sequelize } from  'sequelize'

const sequelize = require('sequelize')

const MODEL_NAME = 'messages';

export const Model = DB.define( MODEL_NAME, {
  name: {
    type: sequelize.STRING
  },
  email: {
    type: sequelize.STRING
  },
  phone: {
    type: sequelize.STRING
  },
  message: {
    type: sequelize.STRING
  },
  read: {
    type: sequelize.BOOLEAN,
    defaultValue: false
  },
  important: {
    type: sequelize.BOOLEAN,
    defaultValue: false
  },
});


export { Model as MessagesModel }
