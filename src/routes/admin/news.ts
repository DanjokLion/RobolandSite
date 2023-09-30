import * as express from 'express'
import cyrillictotranslit from 'cyrillic-to-translit-js'
import fs from 'fs'

const router: any = express.Router();

import { NewsModel, UsersModel } from '../../models'

router.get('/', async ( req:express.Request, res:express.Response, next: express.NextFunction ) => {
  try {
    const data = await NewsModel.findAll({ include: {
        model: UsersModel,
        attributes: ['id', 'name']
      }, raw: true })
    res.render('admin/news/index', { data })
  } catch (error) {
    res.status(500).json(error);
  }
})

router.get('/add', async ( req:express.Request, res:express.Response, next: express.NextFunction ) => {
  try {
    res.render('admin/news/add', { })
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

      img.mv(process.cwd() + '/public/uploads/images/news/' + img.name, function(err: any) {
        if (err) {
          return res.status(500).send(err);
        }
      });
    }

    await NewsModel.create(req.body)

    const data = await NewsModel.findAll({ include: {
        model: UsersModel,
        attributes: ['id', 'name']
      }, raw: true
    })

    res.render('admin/news/index', { data })
  } catch (error) {
    res.status(500).json(error);
  }
})

router.get('/edit/:id', async ( req:express.Request, res:express.Response, next: express.NextFunction ) => {
  try {
    const data = await NewsModel.findOne ({ where:{
      id: req.params.id
    }, raw: true})

    res.render('admin/news/edit', { data })
  } catch (error) {
    res.status(500).json(error);
  }
})

router.post('/edit', async ( req:express.Request, res:express.Response, next: express.NextFunction ) => {
  try {

    if (req.files) {
      const img: any = req.files.picture;

      req.body.picture = img.name
      img.mv(process.cwd() + '/public/uploads/images/news/' + img.name, function(err: any) {
        if (err) {
          return res.status(500).send(err);
        }
      });
    }

    await NewsModel.update(req.body, { where: {
      id: req.body.id
    }, raw: true })

    const data = await NewsModel.findAll({ include: {
        model: UsersModel,
        attributes: ['id', 'name']
      }, raw: true })

    res.render('admin/news/index', { data })
  } catch (error) {
    res.status(500).json(error);
  }
})

router.post('/delete', async ( req:express.Request, res:express.Response, next: express.NextFunction ) => {
  try {
    const item = await NewsModel.findOne({ where: {
      id: req.body.id
    }, raw: true })
    if (item.picture !=null) {
      fs.readdirSync( process.cwd() + '/public/uploads/images/news/').forEach( ( file: any ) => {
        if ( file == item.picture ){
          fs.unlinkSync( process.cwd() + '/public/uploads/images/news/' + item.picture )
        }
      })
    }

    await NewsModel.destroy({ where: {
      id: req.body.id
    } })

    const data = await NewsModel.findAll({ include: {
        model: UsersModel,
        attributes: ['id', 'name']
      }, raw: true })

    res.render('admin/news/index', { data })
  } catch (error) {
    res.status(500).json(error);
  }
})

export { router as newsRoutes }
