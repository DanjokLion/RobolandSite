import { DB } from '../db'

import { GalleryModel } from './galleryModel'
import { MessagesModel } from './messagesModel'
import { NewsModel } from './newsModel'
import { CoursesModel } from './coursesModel'
import { UsersModel } from './usersModel'

UsersModel.hasMany(GalleryModel)
GalleryModel.belongsTo(UsersModel)

UsersModel.hasMany(NewsModel)
NewsModel.belongsTo(UsersModel)

UsersModel.hasMany(CoursesModel)
CoursesModel.belongsTo(UsersModel)

CoursesModel.hasOne(MessagesModel)
MessagesModel.belongsTo(CoursesModel)

DB.sync().then(()=>{
   console.log('sync1')
   UsersModel.findOrCreate({ where: { id: 1, name: "Даниил Попов", email: "31i.daniil.popov@gmail.com", pass: "8bfc950214c522a88f213fc7b38c8e9e576782e7d1c7bc2ae77cc2ef12134e90" }})
   .then(()=> console.log('sync2') ).catch((err: any)=> console.log(err))
 }).catch(( err: any ) => { throw err; })

export { GalleryModel, MessagesModel, NewsModel, CoursesModel, UsersModel }
