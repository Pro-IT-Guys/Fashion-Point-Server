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
exports.CuponController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const cupon_service_1 = require("./cupon.service");
const customResponse_1 = require("../../../shared/customResponse");
const createCupon = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cuponData = req.body;
    const cupon = yield cupon_service_1.CuponService.createCupon(cuponData);
    const responseData = {
        data: cupon,
        message: 'Cupon created successfully',
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
const getCuponById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cuponId } = req.params;
    const cupon = yield cupon_service_1.CuponService.getCuponById(cuponId);
    const responseData = {
        data: cupon,
        message: 'Cupon fetched successfully',
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
const getCuponByCode = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cuponCode } = req.params;
    const cupon = yield cupon_service_1.CuponService.getCuponByCode(cuponCode);
    const responseData = {
        data: cupon,
        message: 'Cupon fetched successfully',
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
const getAllCupons = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cupons = yield cupon_service_1.CuponService.getAllCupons();
    const responseData = {
        data: cupons,
        message: 'Cupons fetched successfully',
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
const deleteCuponById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cuponId } = req.params;
    const cupon = yield cupon_service_1.CuponService.deleteCuponById(cuponId);
    const responseData = {
        data: cupon,
        message: 'Cupon deleted successfully',
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
const verifyCupon = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cuponCode, userId } = req.params;
    const cupon = yield cupon_service_1.CuponService.verifyCupon(cuponCode, userId);
    const responseData = {
        data: cupon,
        message: 'Cupon is valid and can be used',
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
exports.CuponController = {
    createCupon,
    getCuponById,
    getCuponByCode,
    getAllCupons,
    deleteCuponById,
    verifyCupon,
};
