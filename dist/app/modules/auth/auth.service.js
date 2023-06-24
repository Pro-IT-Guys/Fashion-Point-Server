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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const hashPassword_1 = __importDefault(require("../../helpers/hashPassword"));
const user_model_1 = __importDefault(require("../user/user.model"));
const checkPassword_1 = __importDefault(require("../../helpers/checkPassword"));
const config_1 = __importDefault(require("../../../config"));
const generateRandomCode_1 = __importDefault(require("../../../shared/generateRandomCode"));
const sendEmail_1 = __importDefault(require("../../helpers/sendEmail"));
const signupUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = userData, rest = __rest(userData, ["password"]);
    const { email } = userData;
    const accessToken = jsonwebtoken_1.default.sign({ email }, config_1.default.access_token, {
        expiresIn: '1d',
    });
    const verificationCode = (0, generateRandomCode_1.default)();
    const codeGenerationTimestamp = Date.now();
    const subject = 'Verify your email';
    const message = `Your verification code is ${verificationCode}.\nThis code will expire in 5 minutes.\nDon't share it with anyone`;
    const codeSent = (0, sendEmail_1.default)(email, subject, message);
    if (!codeSent)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Otp code could not be sent');
    const hashedPassword = yield (0, hashPassword_1.default)(password);
    const user = yield user_model_1.default.create(Object.assign(Object.assign({ password: hashedPassword }, rest), { codeGenerationTimestamp,
        verificationCode }));
    if (!user)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User creation failed');
    return { accessToken, data: { role: user.role } };
});
const verifyOtp = (email, verificationCode) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email });
    if (!user)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    if (user.verificationCode !== verificationCode) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Incorrect otp code');
    }
    const currentTimestamp = Date.now();
    const generationTimestamp = user.codeGenerationTimestamp || 0;
    const elapsedTime = currentTimestamp - Number(generationTimestamp);
    if (elapsedTime > 5 * 60 * 1000) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Expired otp code'); // if otp code is expired use resend otp button in frontend
    }
    const verified = yield user_model_1.default.findOneAndUpdate({ email }, { isVerified: true }, { new: true });
    if (!verified)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Otp verification failed');
    // Schedule the code deletion using setTimeout()
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        const updatedData = {
            verificationCode: '',
            codeGenerationTimestamp: '',
        };
        yield user_model_1.default.findOneAndUpdate({ email }, updatedData, {
            new: true,
        });
    }), 5 * 60 * 1000);
    const accessToken = jsonwebtoken_1.default.sign({ email }, config_1.default.access_token, {
        expiresIn: '1d',
    });
    return { accessToken, data: { role: user.role } };
});
const resendOtp = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const verificationCode = (0, generateRandomCode_1.default)();
    const codeGenerationTimestamp = Date.now();
    const subject = 'Verify your email';
    const message = `Your verification code is ${verificationCode}.\nThis code will expire in 5 minutes.\nDon't share it with anyone`;
    const codeSent = (0, sendEmail_1.default)(email, subject, message);
    if (!codeSent)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Otp code could not be sent');
    const updatedData = {
        verificationCode,
        codeGenerationTimestamp,
    };
    const user = yield user_model_1.default.findOneAndUpdate({ email }, updatedData, {
        new: true,
    });
    if (!user)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User creation failed');
    const accessToken = jsonwebtoken_1.default.sign({ email }, config_1.default.access_token, {
        expiresIn: '1d',
    });
    return { accessToken, data: { role: user.role } };
});
const loginUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = userData;
    const user = yield user_model_1.default.findOne({ email });
    if (!user)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    const passwordMatch = yield (0, checkPassword_1.default)(password, user);
    if (!passwordMatch)
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Incorrect password');
    const accessToken = jsonwebtoken_1.default.sign({ email }, config_1.default.access_token, {
        expiresIn: '1d',
    });
    return { accessToken, data: { role: user.role } };
});
const loggedInUser = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = jsonwebtoken_1.default.verify(token, config_1.default.access_token);
    const email = decodedToken.email;
    const user = yield user_model_1.default
        .findOne({ email })
        .select({ password: 0, updatedAt: 0, createdAt: 0, __v: 0 });
    if (!user)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    return user;
});
exports.AuthService = {
    signupUser,
    verifyOtp,
    resendOtp,
    loginUser,
    loggedInUser,
};
