"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const galleryModel_1 = require("./galleryModel");
exports.GalleryModel = galleryModel_1.GalleryModel;
const messagesModel_1 = require("./messagesModel");
exports.MessagesModel = messagesModel_1.MessagesModel;
const newsModel_1 = require("./newsModel");
exports.NewsModel = newsModel_1.NewsModel;
const coursesModel_1 = require("./coursesModel");
exports.CoursesModel = coursesModel_1.CoursesModel;
const usersModel_1 = require("./usersModel");
exports.UsersModel = usersModel_1.UsersModel;
usersModel_1.UsersModel.hasMany(galleryModel_1.GalleryModel);
galleryModel_1.GalleryModel.belongsTo(usersModel_1.UsersModel);
usersModel_1.UsersModel.hasMany(newsModel_1.NewsModel);
newsModel_1.NewsModel.belongsTo(usersModel_1.UsersModel);
usersModel_1.UsersModel.hasMany(coursesModel_1.CoursesModel);
coursesModel_1.CoursesModel.belongsTo(usersModel_1.UsersModel);
coursesModel_1.CoursesModel.hasOne(messagesModel_1.MessagesModel);
messagesModel_1.MessagesModel.belongsTo(coursesModel_1.CoursesModel);
db_1.DB.sync().then(() => {
    console.log('sync1');
    usersModel_1.UsersModel.findOrCreate({ where: { id: 1, name: "Даниил Попов", email: "31i.daniil.popov@gmail.com", pass: "8bfc950214c522a88f213fc7b38c8e9e576782e7d1c7bc2ae77cc2ef12134e90" } })
        .then(() => console.log('sync2')).catch((err) => console.log(err));
}).catch((err) => { throw err; });
//# sourceMappingURL=index.js.map