"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const sequelize = require('sequelize');
const MODEL_NAME = 'gallery';
exports.Model = db_1.DB.define(MODEL_NAME, {
    picture: {
        type: sequelize.STRING
    },
    thumbnail: {
        type: sequelize.STRING
    },
});
exports.GalleryModel = exports.Model;
//# sourceMappingURL=galleryModel.js.map