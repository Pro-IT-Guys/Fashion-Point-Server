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
    discountPrice: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
        required: true,
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
        type: String,
        required: true,
    },
    review: {
        type: [mongoose_1.Schema.Types.ObjectId],
    },
    type: {
        type: [String],
        required: true,
    },
    style: {
        type: String,
        required: true,
    },
    fabric: {
        type: String,
        required: true,
    },
    isVisibleOffer: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
productSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = this;
        const isExist = yield productModel.findOne({ path: product.path }).exec();
        if (isExist !== null && Object.keys(isExist).length !== 0) {
            throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Product path already exists');
        }
        next();
    });
});
productSchema.pre('findOneAndUpdate', function (next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const product = this;
        if ((_a = product._update) === null || _a === void 0 ? void 0 : _a.path) {
            const samePath = yield productModel.findOne({
                path: (_b = product._update) === null || _b === void 0 ? void 0 : _b.path,
            });
            if (samePath) {
                throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Product path already exists');
            }
        }
        next();
    });
});
const productModel = (0, mongoose_1.model)('Product', productSchema);
exports.default = productModel;
