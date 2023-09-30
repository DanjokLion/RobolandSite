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
const Router = express.Router();
exports.AdminRoutes = Router;
const sha256 = require('sha256');
const models_1 = require("../../models");
const models_2 = require("../../models");
const news_1 = require("./news");
const courses_1 = require("./courses");
const gallery_1 = require("./gallery");
const users_1 = require("./users");
const messages_1 = require("./messages");
const filesManager_1 = require("./filesManager");
let currentUser;
Router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render('admin/login', {});
    }
    catch (error) {
        // console.log( error );
        res.status(500).json(error);
    }
}));
Router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.UsersModel.findOne({ where: {
                email: req.body.email,
                pass: sha256(req.body.pass),
            }, raw: true });
        currentUser = user;
        const error = 'Неверный логин или пароль';
        if (user != null) {
            const messages = yield models_2.MessagesModel.findAll({ where: { read: false }, raw: true });
            res.locals.messages = messages;
            res.cookie('a', true);
            res.render('admin/index', {});
        }
        else {
            res.render('admin/login', { error });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
Router.get('/logout', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie('a', false);
        res.render('admin/login', {});
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
Router.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield models_2.MessagesModel.findAll({ where: { read: false }, raw: true });
        res.locals.messages = messages;
        res.locals.currentUser = currentUser;
        if (req.cookies.a == 'false' || req.cookies.a == null) {
            res.render('admin/login', {});
        }
        else {
            next();
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
Router.get('/index', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render('admin/index', {});
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
Router.use('/courses', courses_1.coursesRoutes);
Router.use('/news', news_1.newsRoutes);
Router.use('/gallery', gallery_1.galleryRoutes);
Router.use('/users', users_1.usersRoutes);
Router.use('/messages', messages_1.messagesRoutes);
Router.use('/files', filesManager_1.filesManagerRoutes);
//# sourceMappingURL=index.js.map