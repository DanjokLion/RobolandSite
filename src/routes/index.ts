import * as express from "express";

const Router :express.Router = express.Router();

import { homeRoutes } from './home'
import { coursesRoutes } from './courses'
import { newsRoutes } from './news'
import { galleryRoutes } from './gallery'
import { recallRoutes } from './recall'
import { contactsRoutes } from './contacts'
import { confidentialityRoutes } from './confidentiality'
import { AdminRoutes } from './admin'
// import { filesRoutes } from './files'

Router.use( '/', homeRoutes );
Router.use( '/courses', coursesRoutes );
Router.use( '/news', newsRoutes );
Router.use( '/gallery', galleryRoutes );
Router.use( '/confidentiality', confidentialityRoutes );
Router.use( '/contacts', contactsRoutes );
Router.use( '/recall', recallRoutes);
Router.use( '/admin', AdminRoutes );
// Router.use( '/files', filesRoutes );

export { Router };
