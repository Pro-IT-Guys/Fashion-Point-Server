"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CuponRoute = void 0;
const express_1 = __importDefault(require("express"));
const cupon_controller_1 = require("./cupon.controller");
const router = express_1.default.Router();
router.post('/', cupon_controller_1.CuponController.createCupon);
router.get('/code/:cuponCode', cupon_controller_1.CuponController.getCuponByCode);
router.get('/verify/:cuponCode/:userId', cupon_controller_1.CuponController.verifyCupon);
router.get('/:cuponId', cupon_controller_1.CuponController.getCuponById);
router.get('/', cupon_controller_1.CuponController.getAllCupons);
router.delete('/:cuponId', cupon_controller_1.CuponController.deleteCuponById);
exports.CuponRoute = router;
