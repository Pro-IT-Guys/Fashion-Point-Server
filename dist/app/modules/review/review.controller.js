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
exports.ReviewController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const review_service_1 = require("./review.service");
const customResponse_1 = require("../../../shared/customResponse");
const createReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield review_service_1.ReviewService.createReview(req.body);
    const responseData = {
        data: review,
        message: 'Review submitted successfully',
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
const getAllReviews = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const review = yield review_service_1.ReviewService.getAllReviews(productId);
    const responseData = {
        data: review,
        message: 'Review faced successfully',
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
exports.ReviewController = {
    createReview,
    getAllReviews,
};
