"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
require("dotenv").config();
const app = (0, express_1.default)();
// const mongoDB: string = process.env.PASSWD || "";
// mongoose.connect(mongoDB);
app.use((0, express_session_1.default)({ secret: "supersecret", resave: false, saveUninitialized: false }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.send("Hello");
});
app.listen(3000, () => {
    console.log("Server listens at port 3000");
});
