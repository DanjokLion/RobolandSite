import * as express from 'express'
const router: any = express.Router();

import { CoursesModel } from '../models'
import { NewsModel } from '../models'
// import { PostsModel }    from '../models/postsModel'
// import { ServicesModel } from '../models/servicesModel'
// import { CustomersModel } from '../models/customersModel'

router.get( '/', async ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
  try {
    const news = await NewsModel.findAll({ order: [ ['id', 'DESC'] ], limit: 3, raw: true })
    const courses = await CoursesModel.findAll({ raw: true })
		// const posts = await PostsModel.findAll({ limit: 3, raw: true })
		// const services = await ServicesModel.findAll({ limit: 3, raw: true })
    // const customers = await CustomersModel.findAll({ raw: true })
    res.locals.metaTags = {
        title: "RoboLand",
        description: 'Roboland - учим робототехнике',
        keywords: "Roboland"
    };
    res.render('index', { news, courses })
  } catch ( error ) {
    // console.log( error );
    res.status(500).json( error );
  }
});

export { router as homeRoutes }
