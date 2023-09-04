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
exports.comments_get = void 0;
const comment_1 = __importDefault(require("../models/comment"));
const comments_get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentsRes = yield comment_1.default.find({}).populate("author");
        res.send(`<pre>${commentsRes}</pre>`);
    }
    catch (error) {
        res.send(error);
    }
});
exports.comments_get = comments_get;
