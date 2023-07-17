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
exports.scheduleCronJobs = void 0;
/* eslint-disable no-console */
const node_cron_1 = __importDefault(require("node-cron"));
const product_model_1 = __importDefault(require("../modules/product/product.model"));
const offer_model_1 = __importDefault(require("../modules/offer/offer.model"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
// Define the cron jobs
const scheduleCronJobs = (offer) => {
    const { startFrom, endAt, _id } = offer;
    if (startFrom && endAt) {
        const startFromCronExpression = getCronExpression(startFrom);
        const endAtCronExpression = getCronExpression(endAt);
        node_cron_1.default.schedule(endAtCronExpression, () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const originalProducts = yield product_model_1.default.updateMany({ _id: { $in: offer.product } }, { $set: { discountPrice: 0, isVisibleOffer: false } });
                if (originalProducts.modifiedCount <= 0) {
                    console.error('Failed to restore original product prices.');
                }
            }
            catch (error) {
                console.error('Error restoring original product prices:', error);
            }
        }));
        node_cron_1.default.schedule(startFromCronExpression, () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const updatedProducts = yield product_model_1.default.updateMany({ _id: { $in: offer.product } }, { $set: { isVisibleOffer: true } });
                const updateOffer = yield offer_model_1.default.findByIdAndUpdate(_id, { $set: { isVisible: true } }, { new: true });
                if (!updateOffer) {
                    throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Offer not found');
                }
                console.log(updateOffer);
                if (updatedProducts.modifiedCount <= 0) {
                    console.error('Failed to update product prices.');
                }
            }
            catch (error) {
                console.error('Error updating product prices:', error);
            }
        }));
    }
};
exports.scheduleCronJobs = scheduleCronJobs;
// Helper function to convert a Date object to a cron expression
const getCronExpression = (date) => {
    const second = date.getSeconds();
    const minute = date.getMinutes();
    const hour = date.getHours();
    const dayOfMonth = date.getDate();
    const month = date.getMonth() + 1; // Note: Months are zero-based
    const dayOfWeek = date.getDay();
    return `${second} ${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
};
