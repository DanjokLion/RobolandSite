import * as express from 'express'
const router: any = express.Router();

import { CoursesModel } from '../models'

router.get( '/', async ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
  try {
    const courses =  await CoursesModel.findAll({ raw: true })

    res.locals.metaTags = {
        title: "Курсы",
        description: 'Roboland - учим робототехнике',
        keywords: "Roboland"
    };
    res.render('courses/index', { courses })
  } catch ( error ) {
    // console.log( error );
    res.status(500).json( error );
  }
});

router.get( '/:link', async ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
  try {
    const content = await CoursesModel.findOne({ where: {
      link: req.params.link
    }, raw: true })

    res.locals.metaTags = {
        title: content.title,
        description: content.meta_descrtiption,
        keywords: content.meta_keywords
    };
    res.render('courses/page', { content })
  } catch ( error ) {
    // console.log( error );
    res.status(500).json( error );
  }
});
export { router as coursesRoutes }
