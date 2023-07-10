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
exports.PaymentController = void 0;
const payment_service_1 = require("./payment.service");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const customResponse_1 = require("../../../shared/customResponse");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const stripePayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId, paymentMethodId, currency } = req.body;
    const order = yield payment_service_1.PaymentService.stripePayment(orderId, paymentMethodId, currency);
    const responseData = {
        data: order,
        message: 'Payment processed successfully',
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
const paypalPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId, email, currency } = req.body;
    const approvalUrl = yield payment_service_1.PaymentService.paypalPayment(orderId, email, currency);
    if (approvalUrl.redirectUrl) {
        const responseData = {
            data: approvalUrl,
            message: 'Payment processed successfully',
        };
        (0, customResponse_1.sendSuccessResponse)(res, responseData);
    }
    else {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create PayPal payment');
    }
}));
const handlePayPalWebhookForVerifyPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the payment ID from the webhook event
    const paymentId = req.body.resource.id;
    const payment = yield payment_service_1.PaymentService.handlePayPalWebhookForVerifyPayment(paymentId);
    const responseData = {
        data: payment,
        message: 'Payment processed successfully',
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
exports.PaymentController = {
    stripePayment,
    paypalPayment,
    handlePayPalWebhookForVerifyPayment,
};
