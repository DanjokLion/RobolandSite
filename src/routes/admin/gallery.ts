import * as express from 'express'
import fs from 'fs'

const router: any = express.Router();

import { GalleryModel, UsersModel } from '../../models'

router.get('/', async ( req:express.Request, res:express.Response, next: express.NextFunction ) => {
  try {
    const data = await GalleryModel.findAll({ include: {
        model: UsersModel,
        attributes: ['id', 'name']
      }, raw: true })
    res.render('admin/gallery/index', { data })
  } catch (error) {
    res.status(500).json(error);
  }
})

router.get('/add', async ( req:express.Request, res:express.Response, next: express.NextFunction ) => {
  try {
    res.render('admin/gallery/add', { })
  } catch (error) {
    res.status(500).json(error);
  }
})

router.post('/add', async ( req:express.Request, res:express.Response, next: express.NextFunction ) => {
  try {

    if (req.files.picture) {
      const img: any = req.files.picture;
      req.body.picture = img.name
      img.mv(process.cwd() + '/public/uploads/images/gallery/' + img.name, function(err: any) {
        if (err) {
          return res.status(500).send(err);
        }
      });
    }


    if (req.files.thumbnail) {
      const imgThum: any = req.files.thumbnail;
      req.body.thumbnail = imgThum.name
      imgThum.mv(process.cwd() + '/public/uploads/images/gallery/thumbnail/' + imgThum.name, function(err: any) {
        if (err) {
          return res.status(500).send(err);
        }
      });
    }

    await GalleryModel.create(req.body)
    const data = await GalleryModel.findAll ({ raw: true })
    res.render('admin/gallery/index', { data })
  } catch (error) {
    res.status(500).json(error);
  }
})

router.get('/edit/:id', async ( req:express.Request, res:express.Response, next: express.NextFunction ) => {
  try {
    const data = await GalleryModel.findOne ({ where:{
      id: req.params.id
    }, raw: true})
    res.render('admin/gallery/edit', { data })
  } catch (error) {
    res.status(500).json(error);
  }
})

router.post('/edit', async ( req:express.Request, res:express.Response, next: express.NextFunction ) => {
  try {


    if (req.files.picture) {
      const img: any = req.files.picture;
      req.body.picture = img.name
      img.mv(process.cwd() + '/public/uploads/images/gallery/' + img.name, function(err: any) {
        if (err) {
          return res.status(500).send(err);
        }
      });
    }


    if (req.files.thumbnail) {
      const imgThum: any = req.files.thumbnail;
      req.body.thumbnail = imgThum.name
      imgThum.mv(process.cwd() + '/public/uploads/images/gallery/thumbnail/' + imgThum.name, function(err: any) {
        if (err) {
          return res.status(500).send(err);
        }
      });
    }

    await GalleryModel.update(req.body, { where: {
      id: req.body.id
    } })
    const data = await GalleryModel.findAll ({ raw: true })
    res.render('admin/gallery/index', { data })
  } catch (error) {
    res.status(500).json(error);
  }
})

router.post('/delete', async ( req:express.Request, res:express.Response, next: express.NextFunction ) => {
  try {
    const item = await GalleryModel.findOne ({ where: {
      id: req.body.id
    }, raw: true })
    if (item.picture != null){
      fs.readdirSync( process.cwd() + '/public/uploads/images/gallery/').forEach( ( file: any ) => {
        if ( file == item.picture ){
          fs.unlinkSync( process.cwd() + '/public/uploads/images/gallery/' + item.picture )
        }
      })
    }
    if (item.thumbnail != null) {
      fs.readdirSync( process.cwd() + '/public/uploads/images/gallery/thumbnail/').forEach( ( file: any ) => {
        if ( file == item.thumbnail ){
          fs.unlinkSync( process.cwd() + '/public/uploads/images/gallery/thumbnail/' + item.thumbnail )
        }
      })
    }

    await GalleryModel.destroy ({ where: {
      id: req.body.id
    } })

    const data = await GalleryModel.findAll ({ raw: true})
    res.render('admin/gallery/index', { data })
  } catch (error) {
    res.status(500).json(error);
  }
})

export { router as galleryRoutes }
