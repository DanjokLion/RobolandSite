import * as express from 'express'

const router: any = express.Router();

import { MessagesModel } from '../models'

router.post( '/', async (req:express.Request, res:express.Response) =>{
  try {
      await MessagesModel.create(req.body)
  } catch (error) {
      res.status(500).json(error);
  }
})

export { router as recallRoutes }
