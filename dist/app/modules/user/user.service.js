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
exports.UserService = void 0;
const paginationHelper_1 = __importDefault(require("../../helpers/paginationHelper"));
const user_constant_1 = require("./user.constant");
const user_model_1 = __importDefault(require("./user.model"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const getAllUsers = (filters, paginationOption) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filterFields = __rest(filters
    // Need update here, search by name is not working as name is a embeded field--------->
    , ["searchTerm"]);
    // Need update here, search by name is not working as name is a embeded field--------->
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: user_constant_1.USER_SEARCH_FIELDS.map(field => ({
                [field]: new RegExp(searchTerm, 'i'),
            })),
        });
    }
    if (Object.keys(filterFields).length) {
        andConditions.push({
            $and: Object.entries(filterFields).map(([key, value]) => ({
                [key]: value,
            })),
        });
    }
    const whereCondition = andConditions.length ? { $and: andConditions } : {};
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelper_1.default)(paginationOption);
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const result = yield user_model_1.default
        .find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit)
        .select({
        password: 0,
        verificationCode: 0,
        codeGenerationTimestamp: 0,
        __v: 0,
    });
    const total = yield user_model_1.default.countDocuments();
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
const updateUser = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.default.findOne({ _id: userId });
    if (!isExist)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    const updatedUser = yield user_model_1.default.findOneAndUpdate({ _id: userId }, userData, { new: true });
    if (!updatedUser)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'USomething went wrong to update user');
    return updatedUser;
});
exports.UserService = {
    getAllUsers,
    updateUser,
};
