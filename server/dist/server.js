"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_config_1 = __importDefault(require("./lib/passport_config"));
const router_1 = __importDefault(require("./lib/router"));
require("dotenv").config();
const app = (0, express_1.default)();
// const mongoDB: string = process.env.PASSWD || "";
// mongoose.connect(mongoDB);
app.use((0, express_session_1.default)({ secret: "supersecret", resave: false, saveUninitialized: false }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
(0, passport_config_1.default)(passport_1.default);
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(router_1.default);
app.listen(3000, () => {
    console.log("Server listens at port 3000");
});
