"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profilePictureUploadMiddleware = exports.productBackPictureUploadMiddleware = exports.productFrontPictureUploadMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: 'dist/public/images/product',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extension = file.originalname.split('.').pop();
        cb(null, `${uniqueSuffix}.${extension}`);
    },
});
exports.productFrontPictureUploadMiddleware = (0, multer_1.default)({ storage }).single('frontImage');
exports.productBackPictureUploadMiddleware = (0, multer_1.default)({ storage }).single('backImage');
exports.profilePictureUploadMiddleware = (0, multer_1.default)({ storage }).single('profilePicture');
