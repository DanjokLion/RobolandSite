import * as express from 'express'
import cyrillictotranslit from 'cyrillic-to-translit-js'
import fs from 'fs'

const router: any = express.Router();

import { CoursesModel, UsersModel } from '../../models'

router.get('/', async ( req:express.Request, res:express.Response, next: express.NextFunction ) => {
  try {
    const data = await CoursesModel.findAll({ include: {
      model: UsersModel,
      attributes: ['id', 'name']
    }, raw: true })

    res.render('admin/courses/index', { data })
  } catch (error) {
    res.status(500).json(error);
  }
})

router.get('/add', async ( req:express.Request, res:express.Response, next: express.NextFunction ) => {
  try {
    res.render('admin/courses/add', { })
  } catch (error) {
    res.status(500).json(error);
  }
})

router.post('/add', async ( req:express.Request, res:express.Response, next: express.NextFunction ) => {
  try {
    req.body.link = new cyrillictotranslit().transform(req.body.title,"_")

    if (req.files) {
      const img: any = req.files.picture;
      req.body.picture = img.name
      img.mv(process.cwd() + '/public/uploads/images/courses/' + img.name, function(err: any) {
        if (err) {
          return res.status(500).send(err);
        }
      });
    }
    await CoursesModel.create(req.body)

    const data = await CoursesModel.findAll({ include: {
      model: UsersModel,
      attributes: ['id', 'name']
    }, raw: true })

    res.render('admin/courses/index', { data })
  } catch (error) {
    res.status(500).json(error);
  }
})

router.get('/edit/:id', async ( req:express.Request, res:express.Response, next: express.NextFunction ) => {
  try {
    const data = await CoursesModel.findOne({ where:{
      id: req.params.id
    }, raw: true })
    res.render('admin/courses/edit', { data })
  } catch (error) {
    res.status(500).json(error);
  }
})

router.post('/edit', async ( req:express.Request, res:express.Response, next: express.NextFunction ) => {
  try {


    if (req.files) {
      const img: any = req.files.picture;
      req.body.picture = img.name
      img.mv(process.cwd() + '/public/uploads/images/courses/' + img.name, function(err: any) {
        if (err) {
          return res.status(500).send(err);
        }
      });
    }

    await CoursesModel.update(req.body, { where: {
      id: req.body.id
    }, raw: true })
    const data = await CoursesModel.findAll({ include: {
      model: UsersModel,
      attributes: ['id', 'name']
    }, raw: true })
    res.render('admin/courses/index', { data })
  } catch (error) {
    res.status(500).json(error);
  }
})

router.post('/delete', async ( req:express.Request, res:express.Response, next: express.NextFunction ) => {
  try {
    const item = await CoursesModel.findOne({ where: {
      id: req.body.id
    }, raw: true })

    if ( item.picture != null ){
      fs.readdirSync(process.cwd() + '/public/uploads/images/courses/').forEach( ( file: any ) => {
        if ( file == item.picture ) {
          fs.unlinkSync( process.cwd() + '/public/uploads/images/courses/' + item.picture  )
        }
      })
    }

    await CoursesModel.destroy({ where: { id: req.body.id } })


    const data = await CoursesModel.findAll({ include: {
      model: UsersModel,
      attributes: ['id', 'name']
    }, raw: true })
    res.render('admin/courses/index', { data })
  } catch (error) {
    res.status(500).json(error);
  }
})

export { router as coursesRoutes }
