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
exports.imageUploadController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const fileUpload = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.file) {
            res.json({
                status: 'success',
                url: `http://localhost:8000/images/product/${req.file.filename}`,
            });
        }
        else {
            res.json({
                status: 'error',
                message: 'Please select an image',
            });
        }
    }
    catch (err) {
        // Handle any potential errors
    }
}));
const multiFileUploads = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('req.files', req.files);
    try {
        if (!req.files) {
            return res
                .status(400)
                .json({ status: 'error', message: 'No files uploaded.' });
        }
        const imageUrl = [];
        req.files.forEach((img) => {
            imageUrl.push(`http://localhost:8000/images/product/${img.filename}`);
        });
        res.status(200).json({
            status: 'success',
            imageURLs: imageUrl,
        });
    }
    catch (err) {
        // Handle any potential errors
    }
}));
exports.imageUploadController = {
    fileUpload,
    multiFileUploads,
};
