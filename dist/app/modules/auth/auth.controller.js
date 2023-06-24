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
exports.AuthController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const auth_service_1 = require("./auth.service");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const customResponse_1 = require("../../../shared/customResponse");
const signupUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const user = yield auth_service_1.AuthService.signupUser(userData);
    const { accessToken } = user;
    res
        .header('Authorization', `Bearer ${accessToken}`)
        .header('Access-Control-Expose-Headers', 'Authorization')
        .json({
        message: 'Otp sent! Check your email for verification code',
        success: true,
        statusCode: http_status_1.default.CREATED,
    });
}));
const verifyOtp = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, verificationCode } = req.body;
    const user = yield auth_service_1.AuthService.verifyOtp(email, verificationCode);
    const { accessToken, data } = user;
    res
        .header('Authorization', `Bearer ${accessToken}`)
        .header('Access-Control-Expose-Headers', 'Authorization')
        .json({
        message: 'Otp verified successfully',
        data,
        success: true,
        statusCode: http_status_1.default.OK,
    });
}));
const resendOtp = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield auth_service_1.AuthService.resendOtp(email);
    const { accessToken } = user;
    res
        .header('Authorization', `Bearer ${accessToken}`)
        .header('Access-Control-Expose-Headers', 'Authorization')
        .json({
        message: 'Otp sent! Check your email for verification code',
        success: true,
        statusCode: http_status_1.default.OK,
    });
}));
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const user = yield auth_service_1.AuthService.loginUser(userData);
    const { accessToken, data } = user;
    res
        .header('Authorization', `Bearer ${accessToken}`)
        .header('Access-Control-Expose-Headers', 'Authorization')
        .json({
        message: 'User logged in successfully',
        data,
        success: true,
        statusCode: http_status_1.default.OK,
    });
}));
const loggedInUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Please provide a token');
    }
    const token = authorizationHeader.split(' ')[1];
    const user = yield auth_service_1.AuthService.loggedInUser(token);
    const responseData = {
        data: user,
        message: 'User retrieved successfully',
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
exports.AuthController = {
    signupUser,
    verifyOtp,
    resendOtp,
    loginUser,
    loggedInUser,
};
