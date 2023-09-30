"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const sequelize = require('sequelize');
const MODEL_NAME = 'courses';
exports.Model = db_1.DB.define(MODEL_NAME, {
    title: {
        type: sequelize.STRING
    },
    link: {
        type: sequelize.STRING
    },
    picture: {
        type: sequelize.STRING
    },
    anons: {
        type: sequelize.STRING
    },
    content: {
        type: sequelize.STRING
    },
    meta_keywords: {
        type: sequelize.STRING
    },
    meta_description: {
        type: sequelize.STRING
    },
});
exports.CoursesModel = exports.Model;
//# sourceMappingURL=coursesModel.js.map