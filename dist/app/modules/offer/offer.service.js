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
exports.offerService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const offer_model_1 = __importDefault(require("./offer.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = __importDefault(require("../product/product.model"));
const cornJobs_1 = require("../../helpers/cornJobs");
const createOffer = (offerData) => __awaiter(void 0, void 0, void 0, function* () {
    const { startFrom, endAt } = offerData;
    const existingOffer = yield offer_model_1.default.findOne({
        $or: [
            { startFrom: { $gte: startFrom, $lte: endAt } },
            { endAt: { $gte: startFrom, $lte: endAt } },
            {
                $and: [{ startFrom: { $lte: startFrom } }, { endAt: { $gte: endAt } }],
            },
        ],
    });
    if (existingOffer) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'An offer already exists within the specified date range');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const createdOfferArray = yield offer_model_1.default.create([offerData], { session });
        const offer = createdOfferArray[0].toObject();
        if (!offer) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Unable to create offer');
        }
        const updatedProducts = yield product_model_1.default.updateMany({ _id: { $in: offer.product } }, { $set: { discountPrice: offer.discountPrice, isVisible: true } });
        if (updatedProducts.modifiedCount <= 0) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Unable to update product prices');
        }
        yield session.commitTransaction();
        session.endSession();
        // Schedule cron jobs after the offer has been created and the transaction committed
        (0, cornJobs_1.scheduleCronJobs)(offer);
        return offer;
    }
    catch (error) {
        session.endSession();
        throw error;
    }
});
const getOfferById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const offer = yield offer_model_1.default.findById(id);
    if (!offer) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Offer not found');
    }
    return offer;
});
exports.offerService = {
    createOffer,
    getOfferById,
};
