"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const sequelize = require('sequelize');
const MODEL_NAME = 'messages';
exports.Model = db_1.DB.define(MODEL_NAME, {
    name: {
        type: sequelize.STRING
    },
    email: {
        type: sequelize.STRING
    },
    phone: {
        type: sequelize.STRING
    },
    message: {
        type: sequelize.STRING
    },
    read: {
        type: sequelize.BOOLEAN,
        defaultValue: false
    },
    important: {
        type: sequelize.BOOLEAN,
        defaultValue: false
    },
});
exports.MessagesModel = exports.Model;
//# sourceMappingURL=messagesModel.js.map