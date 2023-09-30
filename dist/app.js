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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const index_1 = require("./routes/index");
const browser_detect_1 = __importDefault(require("browser-detect"));
dotenv_1.default.config();
const port = process.env.SERVER_PORT;
exports.app = express_1.default();
exports.app.set('views', 'public');
exports.app.set('views', path_1.default.join(__dirname, 'views'));
exports.app.set("view engine", "pug");
exports.app.use(express_fileupload_1.default());
exports.app.use(cookie_parser_1.default());
exports.app.use('/', express_1.default.static('public', { index: false }));
exports.app.use(body_parser_1.default.urlencoded({ extended: true }));
exports.app.use(body_parser_1.default.json({ limit: '5mb' }));
exports.app.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Expose-Headers", "x-total-count");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
    res.header("Access-Control-Allow-Headers", "Content-Type,authorization");
    res.locals.year = (new Date()).getFullYear();
    res.locals.browserName = browser_detect_1.default(req.headers['user-agent']).name;
    res.locals.browserVersion = browser_detect_1.default(req.headers['user-agent']).versionNumber;
    res.locals.mobile = browser_detect_1.default(req.headers['user-agent']).mobile;
    // console.log(res.locals.browserName, res.locals.browserVersion, 'mobile', res.locals.mobile)
    next();
}));
exports.app.use('/', index_1.Router);
exports.app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map