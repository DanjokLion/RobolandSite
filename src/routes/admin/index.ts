import * as express from 'express'

const Router: express.Router = express.Router();
const sha256 = require('sha256');

import { UsersModel } from '../../models'
import { MessagesModel } from '../../models'

import { newsRoutes } from './news'
import { coursesRoutes } from './courses'
import { galleryRoutes } from './gallery'
import { usersRoutes } from './users'
import { messagesRoutes } from './messages'
import { filesManagerRoutes } from './filesManager'

let currentUser: any

Router.get( '/', async ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
  try {
    res.render('admin/login', { })
  } catch ( error ) {
    // console.log( error );
    res.status(500).json( error );
  }
});

Router.post('/login', async ( req:express.Request, res:express.Response, next: express.NextFunction ) => {
  try {
    const user = await UsersModel.findOne({ where:{
      email: req.body.email,
      pass: sha256(req.body.pass),
    }, raw:true })
    currentUser = user
    const error = 'Неверный логин или пароль'

    if (user != null) {
      const messages: any = await MessagesModel.findAll( { where: { read: false }, raw: true } )
      res.locals.messages = messages
      res.cookie('a', true)
      res.render('admin/index', { })
    } else {
      res.render('admin/login', {error})
    }
  } catch (error) {
    res.status(500).json(error);
  }
})

Router.get('/logout', async ( req:express.Request, res:express.Response, next: express.NextFunction ) => {
  try {
    res.cookie('a', false)
    res.render('admin/login', { })
  } catch (error) {
    res.status(500).json(error);
  }
})

Router.use( async ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
  try {
    const messages: any = await MessagesModel.findAll( { where: { read: false }, raw: true } )
    res.locals.messages = messages
    res.locals.currentUser = currentUser
    if (req.cookies.a == 'false' || req.cookies.a == null) {
      res.render('admin/login', {});
    } else  {
      next();
    }
  } catch (error)  {
    res.status(500).json(error);
  }

})

Router.get('/index', async ( req:express.Request, res:express.Response, next: express.NextFunction ) => {
  try {
    res.render('admin/index', { })
  } catch (error) {
    res.status(500).json(error);
  }
})

Router.use( '/courses', coursesRoutes );
Router.use( '/news', newsRoutes );
Router.use( '/gallery', galleryRoutes );
Router.use( '/users', usersRoutes );
Router.use( '/messages', messagesRoutes)
Router.use( '/files', filesManagerRoutes)

export { Router as AdminRoutes};
