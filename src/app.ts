import dotenv from "dotenv";
import express from "express";
import {createServer} from 'http';
import path from "path";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import { Router } from './routes/index';
import browser from 'browser-detect';

dotenv.config();

const port = process.env.SERVER_PORT;

export const app = express();

app.set( 'views', 'public' );

app.set( 'views', path.join(__dirname, 'views'));

app.set( "view engine", "pug" );

app.use(fileUpload());

app.use(cookieParser())

app.use( '/', express.static('public', { index: false }) );

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json({limit: '5mb'}));

app.use( async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Expose-Headers", "x-total-count");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type,authorization");
  res.locals.year = (new Date()).getFullYear()
  res.locals.browserName = browser(req.headers['user-agent']).name
  res.locals.browserVersion = browser(req.headers['user-agent']).versionNumber
  res.locals.mobile = browser(req.headers['user-agent']).mobile
  // console.log(res.locals.browserName, res.locals.browserVersion, 'mobile', res.locals.mobile)
  next();
})

app.use( '/', Router );

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
