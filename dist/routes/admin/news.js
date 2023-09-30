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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const cyrillic_to_translit_js_1 = __importDefault(require("cyrillic-to-translit-js"));
const fs_1 = __importDefault(require("fs"));
const router = express.Router();
exports.newsRoutes = router;
const models_1 = require("../../models");
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield models_1.NewsModel.findAll({ include: {
                model: models_1.UsersModel,
                attributes: ['id', 'name']
            }, raw: true });
        res.render('admin/news/index', { data });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.get('/add', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render('admin/news/add', {});
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post('/add', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.link = new cyrillic_to_translit_js_1.default().transform(req.body.title, "_");
        if (req.files) {
            const img = req.files.picture;
            req.body.picture = img.name;
            img.mv(process.cwd() + '/public/uploads/images/news/' + img.name, function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
            });
        }
        yield models_1.NewsModel.create(req.body);
        const data = yield models_1.NewsModel.findAll({ include: {
                model: models_1.UsersModel,
                attributes: ['id', 'name']
            }, raw: true
        });
        res.render('admin/news/index', { data });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.get('/edit/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield models_1.NewsModel.findOne({ where: {
                id: req.params.id
            }, raw: true });
        res.render('admin/news/edit', { data });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post('/edit', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.files) {
            const img = req.files.picture;
            req.body.picture = img.name;
            img.mv(process.cwd() + '/public/uploads/images/news/' + img.name, function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
            });
        }
        yield models_1.NewsModel.update(req.body, { where: {
                id: req.body.id
            }, raw: true });
        const data = yield models_1.NewsModel.findAll({ include: {
                model: models_1.UsersModel,
                attributes: ['id', 'name']
            }, raw: true });
        res.render('admin/news/index', { data });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post('/delete', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield models_1.NewsModel.findOne({ where: {
                id: req.body.id
            }, raw: true });
        if (item.picture != null) {
            fs_1.default.readdirSync(process.cwd() + '/public/uploads/images/news/').forEach((file) => {
                if (file == item.picture) {
                    fs_1.default.unlinkSync(process.cwd() + '/public/uploads/images/news/' + item.picture);
                }
            });
        }
        yield models_1.NewsModel.destroy({ where: {
                id: req.body.id
            } });
        const data = yield models_1.NewsModel.findAll({ include: {
                model: models_1.UsersModel,
                attributes: ['id', 'name']
            }, raw: true });
        res.render('admin/news/index', { data });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
//# sourceMappingURL=news.js.map