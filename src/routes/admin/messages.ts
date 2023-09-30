import * as express from 'express'

const router: any = express.Router();

import { MessagesModel, CoursesModel } from '../../models'

router.get('/', async ( req:express.Request, res:express.Response, next: express.NextFunction ) => {
  try {
    const data = await MessagesModel.findAll({ raw: true, include: {
      model: CoursesModel,
      attributes: ['id', 'title']
    } })
    console.log(data);

    res.render('admin/messages/index', { data })
  } catch (error) {
    res.status(500).json(error);
  }
})


router.get('/edit/:id', async ( req:express.Request, res:express.Response, next: express.NextFunction ) => {
  try {

    await MessagesModel.update({read: true}, { where: {
      id: req.params.id
    } })

    const data = await MessagesModel.findOne ({
      where: {
        id: req.params.id
      },
        include: {
        model: CoursesModel,
        attributes: ['id', 'title']
      }, raw: true
    })


    const messages = await MessagesModel.findAll ({where: {read: false}, raw: true })
    res.locals.messages = messages

    res.render('admin/messages/edit', { data })
  } catch (error) {
    res.status(500).json(error);
  }
})

router.post('/edit', async ( req:express.Request, res:express.Response, next: express.NextFunction ) => {
  try {

    req.body.read = req.body.read == 'on' ? true : false
    req.body.important = req.body.important == 'on' ? true : false

    await MessagesModel.update(req.body, { where: {
      id: req.body.id
    } })

    const messages = await MessagesModel.findAll ({where: {read: false}, raw: true, include: CoursesModel })
    res.locals.messages = messages

    const data = await MessagesModel.findAll ({ raw: true, include: CoursesModel })
    console.log(data);

    res.render('admin/messages/index', { data })
  } catch (error) {
    res.status(500).json(error);
  }
})

router.post('/delete', async ( req:express.Request, res:express.Response, next: express.NextFunction ) => {
  try {
    await MessagesModel.destroy ({ where: {
      id: req.body.id
    } })
    const data = await MessagesModel.findAll ({ raw: true})
    res.render('admin/messages/index', { data })
  } catch (error) {
    res.status(500).json(error);
  }
})

export { router as messagesRoutes }
