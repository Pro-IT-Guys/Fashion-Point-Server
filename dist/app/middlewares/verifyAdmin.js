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
const verifyToken_1 = __importDefault(require("./verifyToken"));
const user_model_1 = __importDefault(require("../modules/user/user.model"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const verifyAdmin = (req, res, next) => {
    (0, verifyToken_1.default)(req, res, () => {
        isAdmin(req, res, next).catch(next);
    });
};
function isAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.user || !req.user.email) {
                throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid token payload');
            }
            const { email } = req.user;
            const user = yield user_model_1.default.findOne({ email });
            if (!user)
                throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
            if (user.role === 'admin') {
                next();
            }
            else {
                res.status(403).json({
                    message: 'You are not authorized to perform this action',
                    success: false,
                    statusCode: http_status_1.default.FORBIDDEN,
                    data: null,
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = verifyAdmin;
