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
const mongoose_1 = require("mongoose");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        index: true,
    },
    sku: {
        type: String,
        required: true,
        unique: true,
    },
    frontImage: {
        type: String,
        required: true,
    },
    backImage: {
        type: String,
        required: true,
    },
    restImage: {
        type: [String],
    },
    buyingPrice: {
        type: Number,
        required: true,
    },
    sellingPrice: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 1000,
    },
    metaDescription: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    color: {
        type: [String],
        required: true,
    },
    size: {
        type: [String],
        required: true,
    },
    tag: {
        type: [String],
        required: true,
    },
    brand: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'ProductBrand',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    type: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'ProductType',
        required: true,
    },
}, {
    timestamps: true,
});
productSchema.pre('findOneAndUpdate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const product = this;
        const samePath = yield productModel.findOne({
            path: product._update.path,
        });
        if (samePath) {
            throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Product path already exists');
        }
        next();
    });
});
const productModel = (0, mongoose_1.model)('Product', productSchema);
exports.default = productModel;
