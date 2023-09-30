"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const router = express.Router();
exports.homeRoutes = router;
const models_1 = require("../models");
const models_2 = require("../models");
// import { PostsModel }    from '../models/postsModel'
// import { ServicesModel } from '../models/servicesModel'
// import { CustomersModel } from '../models/customersModel'
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const news = yield models_2.NewsModel.findAll({ order: [['id', 'DESC']], limit: 3, raw: true });
        const courses = yield models_1.CoursesModel.findAll({ raw: true });
        // const posts = await PostsModel.findAll({ limit: 3, raw: true })
        // const services = await ServicesModel.findAll({ limit: 3, raw: true })
        // const customers = await CustomersModel.findAll({ raw: true })
        res.locals.metaTags = {
            title: "RoboLand",
            description: 'Roboland - учим робототехнике',
            keywords: "Roboland"
        };
        res.render('index', { news, courses });
    }
    catch (error) {
        // console.log( error );
        res.status(500).json(error);
    }
}));
//# sourceMappingURL=home.js.map