"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = __importDefault(require("express"));
const verifyAdmin_1 = __importDefault(require("../../middlewares/verifyAdmin"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.get('/', verifyAdmin_1.default, user_controller_1.UserController.getAllUsers);
exports.UserRoute = router;
