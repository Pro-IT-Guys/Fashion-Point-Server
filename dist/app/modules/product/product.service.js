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
exports.ProductService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const product_model_1 = __importDefault(require("./product.model"));
const generateUniqueSKU_1 = __importDefault(require("../../helpers/generateUniqueSKU"));
const product_constant_1 = require("./product.constant");
const paginationHelper_1 = __importDefault(require("../../helpers/paginationHelper"));
const brand_model_1 = __importDefault(require("../productBrand/brand.model"));
const type_model_1 = __importDefault(require("../productType/type.model"));
const createProduct = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield product_model_1.default.findOne({ path: productData.path });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Product already exist');
    }
    let sku = (0, generateUniqueSKU_1.default)(6);
    while (yield product_model_1.default.findOne({ sku })) {
        sku = (0, generateUniqueSKU_1.default)(6); // Check if the generated SKU already exists in the database. If it does, generate a new one.
    }
    const product = (yield product_model_1.default.create(Object.assign(Object.assign({}, productData), { sku }))).populate([
        {
            path: 'brand',
        },
        {
            path: 'type',
        },
    ]);
    if (!product)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Product creation failed');
    return product;
});
const updateProduct = (productId, productData) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield product_model_1.default.findOne({ _id: productId });
    if (!isExist)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Product not found');
    const product = yield product_model_1.default
        .findOneAndUpdate({ _id: productId }, productData, {
        new: true,
    })
        .populate([
        {
            path: 'brand',
        },
        {
            path: 'type',
        },
    ]);
    if (!product)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Product update failed');
    return product;
});
const getAllProduct = (filters, paginationOption) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filterFields = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        const brand = yield brand_model_1.default.findOne({ name: { $regex: new RegExp(searchTerm, 'i') } }, '_id');
        const type = yield type_model_1.default.findOne({ name: { $regex: new RegExp(searchTerm, 'i') } }, '_id');
        const brandId = brand ? brand._id : null;
        const typeId = type ? type._id : null;
        andConditions.push({
            $or: product_constant_1.PRODUCT_SEARCH_FIELDS.map(field => {
                if (field === 'brand') {
                    return {
                        brand: brandId,
                    };
                }
                else if (field === 'type') {
                    return {
                        type: typeId,
                    };
                }
                else {
                    return {
                        [field]: new RegExp(searchTerm, 'i'),
                    };
                }
            }),
        });
    }
    if (Object.keys(filterFields).length) {
        const fieldConditions = Object.entries(filterFields).map(([key, value]) => {
            if (key === 'minPrice') {
                return {
                    sellingPrice: {
                        $gte: value,
                    },
                };
            }
            else if (key === 'maxPrice') {
                return {
                    sellingPrice: {
                        $lte: value,
                    },
                };
            }
            else if (key === 'minRating') {
                return {
                    rating: {
                        $gte: value,
                    },
                };
            }
            else if (key === 'maxRating') {
                return {
                    rating: {
                        $lte: value,
                    },
                };
            }
            else {
                return {
                    [key]: value,
                };
            }
        });
        andConditions.push({
            $and: fieldConditions,
        });
    }
    const whereCondition = andConditions.length ? { $and: andConditions } : {};
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelper_1.default)(paginationOption);
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const result = yield product_model_1.default
        .find(whereCondition)
        .populate('brand', 'name')
        .populate('type', 'name')
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield product_model_1.default.countDocuments();
    const responseData = {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
    return responseData;
});
const getProductById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.default.findOne({ _id: productId }).populate([
        {
            path: 'brand',
        },
        {
            path: 'type',
        },
    ]);
    if (!product)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Product not found');
    return product;
});
const getProductByPath = (path) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.default
        .findOne({ path })
        .populate([{ path: 'brand' }, { path: 'type' }]);
    if (!product)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Product not found');
    return product;
});
const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.default.findOne({ _id: productId });
    if (!product) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Product not found');
    }
    const deletedProduct = yield product_model_1.default.findByIdAndDelete(productId);
    if (!deletedProduct) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Product deletion failed');
    }
    return deletedProduct;
});
exports.ProductService = {
    createProduct,
    updateProduct,
    getAllProduct,
    getProductById,
    getProductByPath,
    deleteProduct,
};
