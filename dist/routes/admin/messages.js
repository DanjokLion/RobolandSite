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
exports.messagesRoutes = router;
const models_1 = require("../../models");
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield models_1.MessagesModel.findAll({ raw: true, include: {
                model: models_1.CoursesModel,
                attributes: ['id', 'title']
            } });
        console.log(data);
        res.render('admin/messages/index', { data });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.get('/edit/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.MessagesModel.update({ read: true }, { where: {
                id: req.params.id
            } });
        const data = yield models_1.MessagesModel.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: models_1.CoursesModel,
                attributes: ['id', 'title']
            }, raw: true
        });
        const messages = yield models_1.MessagesModel.findAll({ where: { read: false }, raw: true });
        res.locals.messages = messages;
        res.render('admin/messages/edit', { data });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post('/edit', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.read = req.body.read == 'on' ? true : false;
        req.body.important = req.body.important == 'on' ? true : false;
        yield models_1.MessagesModel.update(req.body, { where: {
                id: req.body.id
            } });
        const messages = yield models_1.MessagesModel.findAll({ where: { read: false }, raw: true, include: models_1.CoursesModel });
        res.locals.messages = messages;
        const data = yield models_1.MessagesModel.findAll({ raw: true, include: models_1.CoursesModel });
        console.log(data);
        res.render('admin/messages/index', { data });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post('/delete', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.MessagesModel.destroy({ where: {
                id: req.body.id
            } });
        const data = yield models_1.MessagesModel.findAll({ raw: true });
        res.render('admin/messages/index', { data });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
//# sourceMappingURL=messages.js.map