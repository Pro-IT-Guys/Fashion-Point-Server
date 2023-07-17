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
exports.CuponService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const cupon_model_1 = __importDefault(require("./cupon.model"));
const mongoose_1 = require("mongoose");
const generateUniqueSKU_1 = __importDefault(require("../../helpers/generateUniqueSKU"));
const createCupon = (cuponData) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield cupon_model_1.default.findOne({ code: cuponData.code });
    if (isExist)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Cupon already exist');
    let cuponCode = (0, generateUniqueSKU_1.default)(8);
    while (yield cupon_model_1.default.findOne({ code: cuponCode })) {
        cuponCode = (0, generateUniqueSKU_1.default)(8);
    }
    cuponData.code = cuponCode;
    const cupon = yield cupon_model_1.default.create(cuponData);
    if (!cupon)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Cupon not created');
    return cupon;
});
const getCuponById = (cuponId) => __awaiter(void 0, void 0, void 0, function* () {
    const cupon = yield cupon_model_1.default.findById(cuponId);
    if (!cupon)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Cupon not found');
    return cupon;
});
const getCuponByCode = (cuponCode) => __awaiter(void 0, void 0, void 0, function* () {
    const cupon = yield cupon_model_1.default.findOne({ code: cuponCode });
    if (!cupon)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Cupon not found');
    return cupon;
});
const getAllCupons = () => __awaiter(void 0, void 0, void 0, function* () {
    const cupons = yield cupon_model_1.default.find();
    if (!cupons)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Cupons not found');
    return cupons;
});
const deleteCuponById = (cuponId) => __awaiter(void 0, void 0, void 0, function* () {
    const cupon = yield cupon_model_1.default.findByIdAndDelete(cuponId);
    if (!cupon)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Cupon not found');
    return cupon;
});
const verifyCupon = (cuponCode, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const cupon = yield cupon_model_1.default.findOne({ code: cuponCode });
    if (!cupon)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Cupon not found');
    const isExpired = new Date() > cupon.expireDate;
    if (isExpired)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Cupon expired');
    const userIdObj = new mongoose_1.Types.ObjectId(userId);
    const isUsed = cupon.usedBy.includes(userIdObj);
    if (isUsed)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Cupon already used');
    return cupon;
});
exports.CuponService = {
    createCupon,
    getCuponById,
    getCuponByCode,
    getAllCupons,
    deleteCuponById,
    verifyCupon,
};
