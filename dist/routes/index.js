"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const Router = express.Router();
exports.Router = Router;
const home_1 = require("./home");
const courses_1 = require("./courses");
const news_1 = require("./news");
const gallery_1 = require("./gallery");
const recall_1 = require("./recall");
const contacts_1 = require("./contacts");
const confidentiality_1 = require("./confidentiality");
const admin_1 = require("./admin");
// import { filesRoutes } from './files'
Router.use('/', home_1.homeRoutes);
Router.use('/courses', courses_1.coursesRoutes);
Router.use('/news', news_1.newsRoutes);
Router.use('/gallery', gallery_1.galleryRoutes);
Router.use('/confidentiality', confidentiality_1.confidentialityRoutes);
Router.use('/contacts', contacts_1.contactsRoutes);
Router.use('/recall', recall_1.recallRoutes);
Router.use('/admin', admin_1.AdminRoutes);
//# sourceMappingURL=index.js.map