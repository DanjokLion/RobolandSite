import * as express from 'express'
const router: any = express.Router();

router.get( '/', async ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
  try {

    res.locals.metaTags = {
        title: "Контакты",
        description: 'Roboland - учим робототехнике',
        keywords: "Roboland"
    };
    res.render('contacts', { })
  } catch ( error ) {
    // console.log( error );
    res.status(500).json( error );
  }
});

export { router as contactsRoutes }
