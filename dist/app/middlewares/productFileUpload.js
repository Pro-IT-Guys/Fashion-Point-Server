"use strict";
/* eslint-disable no-unused-vars */
// This is for without converting to WebP
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
const multer_1 = __importDefault(require("multer"));
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: 'dist/public/images/product',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extension = file.originalname.split('.').pop();
        cb(null, `${uniqueSuffix}.${extension}`);
    },
});
const uploadMiddleware = (req, res, next) => {
    const upload = (0, multer_1.default)({ storage }).fields([
        { name: 'frontImage', maxCount: 1 },
        { name: 'backImage', maxCount: 1 },
        { name: 'restImage', maxCount: 10 },
    ]);
    upload(req, res, (error) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            next(error);
            return;
        }
        const uploadedFiles = req.files;
        // Convert frontImage to WebP
        if (uploadedFiles.frontImage) {
            const frontImage = uploadedFiles.frontImage[0];
            const frontImagePath = frontImage.path;
            const frontImageWebPPath = path_1.default.join(path_1.default.dirname(frontImagePath), `${path_1.default.basename(frontImagePath, path_1.default.extname(frontImagePath))}.webp`);
            yield (0, sharp_1.default)(frontImagePath).toFormat('webp').toFile(frontImageWebPPath);
            // Remove original frontImage
            fs_1.default.unlinkSync(frontImagePath);
        }
        // Convert backImage to WebP
        if (uploadedFiles.backImage) {
            const backImage = uploadedFiles.backImage[0];
            const backImagePath = backImage.path;
            const backImageWebPPath = path_1.default.join(path_1.default.dirname(backImagePath), `${path_1.default.basename(backImagePath, path_1.default.extname(backImagePath))}.webp`);
            yield (0, sharp_1.default)(backImagePath).toFormat('webp').toFile(backImageWebPPath);
            // Remove original backImage
            fs_1.default.unlinkSync(backImagePath);
        }
        // Convert restImage files to WebP
        if (uploadedFiles === null || uploadedFiles === void 0 ? void 0 : uploadedFiles.restImage) {
            const restImages = uploadedFiles.restImage;
            yield Promise.all(restImages.map((image) => __awaiter(void 0, void 0, void 0, function* () {
                const restImagePath = image.path;
                const restImageWebPPath = path_1.default.join(path_1.default.dirname(restImagePath), `${path_1.default.basename(restImagePath, path_1.default.extname(restImagePath))}.webp`);
                yield (0, sharp_1.default)(restImagePath).toFormat('webp').toFile(restImageWebPPath);
                // Remove original restImage
                fs_1.default.unlinkSync(restImagePath);
            })));
        }
        next();
    }));
};
exports.default = uploadMiddleware;
