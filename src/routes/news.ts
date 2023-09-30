import * as express from 'express'
const router: any = express.Router();

import { NewsModel } from '../models'

router.get( '/', async ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
  try {
    const news = await NewsModel.findAll({ raw: true })

    res.locals.metaTags = {
        title: "Новости",
        description: 'Roboland - учим робототехнике',
        keywords: "Roboland"
    };
    res.render('news/index', { news })
  } catch ( error ) {
    // console.log( error );
    res.status(500).json( error );
  }
});

router.get( '/:link', async ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
  try {
    const post = await NewsModel.findOne({ where: {
      link: req.params.link
    }, raw: true })

    res.locals.metaTags = {
        title: post.title,
        description: post.meta_descrtiption,
        keywords: post.meta_keywords
    };
    res.render('news/page', { post })
  } catch ( error ) {
    // console.log( error );
    res.status(500).json( error );
  }
});


export { router as newsRoutes }
