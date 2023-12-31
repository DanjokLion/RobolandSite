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
const fs_1 = __importDefault(require("fs"));
const router = express.Router();
exports.filesManagerRoutes = router;
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const folders = [];
        const files = [];
        fs_1.default.readdirSync(process.cwd() + '/public/uploads/images/').forEach((file) => {
            const re = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jpg|.png|.webp)$/i;
            if (re.test(file) == true) {
                files.push(file);
            }
            else {
                folders.push(file);
            }
            console.log(file);
        });
        res.locals.files = files;
        res.locals.folders = folders;
        res.render('admin/filesManager', {});
    }
    catch (error) {
        // console.log( error );
        res.status(500).json(error);
    }
}));
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        let files = [];
        const arrFiles = [];
        const arrFolders = [];
        fs_1.default.readdirSync(process.cwd() + '/public/uploads/images' + req.body.path).forEach((file) => {
            const re = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jpg|.png|.webp)$/i;
            if (re.test(file) == true) {
                arrFiles.push(file);
            }
            else {
                arrFolders.push(file);
            }
        });
        files = arrFolders.concat(arrFiles);
        // res.locals.files = files
        res.json({ files, parrentDir: req.body.path });
    }
    catch (error) {
        // console.log( error );
        res.status(500).json(error);
    }
}));
router.post('/upload', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('upload body', req.body);
        console.log('upload files', req.files);
        let files = [];
        const arrFiles = [];
        const arrFolders = [];
        const img = req.files.img;
        console.log('path upload', '/public/uploads/images' + (req.body.path || '') + '/' + img.name);
        if (req.files) {
            img.mv(process.cwd() + '/public/uploads/images' + (req.body.path || '') + '/' + img.name, function (err) {
                if (err) {
                    console.log('uploads err', err);
                    return res.status(500).send(err);
                }
            });
        }
        setTimeout(() => {
            fs_1.default.readdirSync(process.cwd() + '/public/uploads/images' + req.body.path).forEach((file) => {
                const re = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jpg|.png|.webp)$/i;
                if (re.test(file) == true) {
                    arrFiles.push(file);
                }
                else {
                    arrFolders.push(file);
                }
            });
            files = arrFolders.concat(arrFiles);
            console.log('uploads files', files);
            res.json({ files, parrentDir: req.body.path });
        }, 100);
    }
    catch (error) {
        // console.log( error );
        res.status(500).json(error);
    }
}));
router.post('/rename', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let files = [];
        const arrFiles = [];
        const arrFolders = [];
        const parrentDir = req.body.path != null ? req.body.path : '/';
        fs_1.default.renameSync(process.cwd() + '/public/uploads/images' + req.body.old, process.cwd() + '/public/uploads/images' + req.body.new);
        fs_1.default.readdirSync(process.cwd() + '/public/uploads/images' + parrentDir).forEach((file) => {
            const re = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jpg|.png|.webp)$/i;
            if (re.test(file) == true) {
                arrFiles.push(file);
            }
            else {
                arrFolders.push(file);
            }
        });
        files = arrFolders.concat(arrFiles);
        res.json({ files, parrentDir });
    }
    catch (error) {
        // console.log( error );
        res.status(500).json(error);
    }
}));
router.post('/delete', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let files = [];
        const arrFiles = [];
        const arrFolders = [];
        const parrentDir = req.body.path != null ? req.body.path : '/';
        fs_1.default.unlinkSync(process.cwd() + '/public/uploads/images' + req.body.file);
        fs_1.default.readdirSync(process.cwd() + '/public/uploads/images' + parrentDir).forEach((file) => {
            const re = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jpg|.png|.webp)$/i;
            if (re.test(file) == true) {
                arrFiles.push(file);
            }
            else {
                arrFolders.push(file);
            }
        });
        files = arrFolders.concat(arrFiles);
        res.json({ files, parrentDir });
    }
    catch (error) {
        // console.log( error );
        res.status(500).json(error);
    }
}));
//# sourceMappingURL=filesManager.js.map