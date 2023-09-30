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
exports.coursesRoutes = router;
const models_1 = require("../models");
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield models_1.CoursesModel.findAll({ raw: true });
        res.locals.metaTags = {
            title: "Курсы",
            description: 'Roboland - учим робототехнике',
            keywords: "Roboland"
        };
        res.render('courses/index', { courses });
    }
    catch (error) {
        // console.log( error );
        res.status(500).json(error);
    }
}));
router.get('/:link', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const content = yield models_1.CoursesModel.findOne({ where: {
                link: req.params.link
            }, raw: true });
        res.locals.metaTags = {
            title: content.title,
            description: content.meta_descrtiption,
            keywords: content.meta_keywords
        };
        res.render('courses/page', { content });
    }
    catch (error) {
        // console.log( error );
        res.status(500).json(error);
    }
}));
//# sourceMappingURL=courses.js.map