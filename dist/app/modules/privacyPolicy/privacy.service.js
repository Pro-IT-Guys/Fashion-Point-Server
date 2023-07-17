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
exports.PrivacyServices = void 0;
const privacy_model_1 = __importDefault(require("./privacy.model"));
const createPrivacyPolicy = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const existingTerms = yield privacy_model_1.default.findOne();
    if (existingTerms) {
        existingTerms.content = data.content;
        yield existingTerms.save();
        return existingTerms;
    }
    else {
        // Create new document if no existing document is found
        const terms = new privacy_model_1.default(data);
        yield terms.save();
        return terms;
    }
});
const getPrivacyPolicy = () => __awaiter(void 0, void 0, void 0, function* () {
    const existingTerms = yield privacy_model_1.default.findOne();
    return existingTerms;
});
exports.PrivacyServices = {
    createPrivacyPolicy,
    getPrivacyPolicy,
};
