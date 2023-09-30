import * as express from 'express'
const router: any = express.Router();

router.get( '/', async ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
  try {

    res.locals.metaTags = {
        title: "Политика конфиденциальности",
        description: 'Roboland - учим робототехнике',
        keywords: "Roboland"
    };
    res.render('index', { })
  } catch ( error ) {
    // console.log( error );
    res.status(500).json( error );
  }
});

export { router as confidentialityRoutes }
