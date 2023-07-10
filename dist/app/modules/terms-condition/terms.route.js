"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermsConditionRoute = void 0;
const express_1 = __importDefault(require("express"));
const terms_controller_1 = require("./terms.controller");
const router = express_1.default.Router();
router.post('/', terms_controller_1.TermsConditionController.createTermsCondition);
router.get('/', terms_controller_1.TermsConditionController.getTermsCondition);
exports.TermsConditionRoute = router;
