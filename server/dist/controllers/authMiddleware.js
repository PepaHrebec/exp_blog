"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkIfLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
        return;
    }
    res.redirect("/issue");
};
exports.default = checkIfLoggedIn;
