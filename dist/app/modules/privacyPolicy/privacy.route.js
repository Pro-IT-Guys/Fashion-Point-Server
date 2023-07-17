"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivacyPolicyRoute = void 0;
const express_1 = __importDefault(require("express"));
const privacy_controller_1 = require("./privacy.controller");
const router = express_1.default.Router();
router.post('/', privacy_controller_1.PrivacyController.createPrivacyPolicy);
router.get('/', privacy_controller_1.PrivacyController.getPrivacyPolicy);
exports.PrivacyPolicyRoute = router;
