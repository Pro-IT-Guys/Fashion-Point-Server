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
exports.DeliveryFeeController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const deliveryFee_service_1 = require("./deliveryFee.service");
const customResponse_1 = require("../../../shared/customResponse");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createFee = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield deliveryFee_service_1.DeliveryFeeService.CreateFee();
    const responseData = {
        data,
        message: 'Delivery fee created successfully',
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
const updateFee = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deliveryData = req.body;
    const { id } = req.params;
    const data = yield deliveryFee_service_1.DeliveryFeeService.updateFee(id, deliveryData);
    const responseData = {
        data,
        message: 'Delivery fee updated successfully',
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
const getAllFees = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield deliveryFee_service_1.DeliveryFeeService.getAllFees();
    const responseData = {
        data,
        message: 'Delivery fee fetched successfully',
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
const getFeeOfLocation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { countryId, stateCode, city_name } = req.body;
    if (!countryId || !stateCode) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Country and state are required');
    }
    const data = yield deliveryFee_service_1.DeliveryFeeService.getFeeOfLocation(countryId, stateCode, city_name);
    const responseData = {
        data,
        message: 'Delivery fee fetched successfully',
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
exports.DeliveryFeeController = {
    createFee,
    updateFee,
    getAllFees,
    getFeeOfLocation,
};
