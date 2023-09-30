import { DB } from '../db'
import { Sequelize } from  'sequelize'

const sequelize = require('sequelize')

const MODEL_NAME = 'gallery';

export const Model = DB.define( MODEL_NAME, {
  picture: {
    type: sequelize.STRING
  },
  thumbnail:{
    type: sequelize.STRING
  },

});


export { Model as GalleryModel }
