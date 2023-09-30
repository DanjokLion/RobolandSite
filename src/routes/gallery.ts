import * as express from 'express'
const router: any = express.Router();

import { GalleryModel } from '../models'

router.get( '/', async ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
  try {
    const gallery = await GalleryModel.findAll({ raw: true })
    res.locals.metaTags = {
        title: "Галерея",
        description: 'Roboland - учим робототехнике',
        keywords: "Roboland"
    };

    res.render('gallery', { gallery })
  } catch ( error ) {
    // console.log( error );
    res.status(500).json( error );
  }
});

export { router as galleryRoutes }
