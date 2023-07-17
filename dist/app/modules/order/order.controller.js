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
exports.OrderController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const order_service_1 = require("./order.service");
const customResponse_1 = require("../../../shared/customResponse");
const pick_1 = __importDefault(require("../../../shared/pick"));
const shared_constant_1 = require("../../../constant/shared.constant");
const http_status_1 = __importDefault(require("http-status"));
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderData = req.body;
    const data = yield order_service_1.OrderService.createOrder(orderData);
    const responseData = {
        data,
        message: 'Order placed successfully',
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
const getAllOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, ['searchTerm']);
    const paginationOption = (0, pick_1.default)(req.query, shared_constant_1.paginationFields);
    const result = yield order_service_1.OrderService.getAllOrder(filters, paginationOption);
    const responseData = {
        statusCode: http_status_1.default.OK,
        meta: result.meta || {},
        data: result.data || [],
        message: 'All Order fetched successfully',
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
const updateOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    const orderData = req.body;
    const data = yield order_service_1.OrderService.updateOrder(orderId, orderData);
    const responseData = {
        data,
        message: 'Order updated successfully',
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
const getOrderByUserId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const data = yield order_service_1.OrderService.getOrderByUserId(userId);
    const responseData = {
        data,
        message: 'Order fetched successfully',
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
const getOrderByOrderId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    const data = yield order_service_1.OrderService.getOrderByOrderId(orderId);
    const responseData = {
        data,
        message: 'Order fetched successfully',
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
exports.OrderController = {
    createOrder,
    getAllOrder,
    updateOrder,
    getOrderByUserId,
    getOrderByOrderId,
};
