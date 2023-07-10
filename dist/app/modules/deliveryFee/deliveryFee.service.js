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
exports.DeliveryFeeService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const country_state_city_1 = require("country-state-city");
const deliveryFee_constant_1 = require("./deliveryFee.constant");
const deliveryFee_model_1 = __importDefault(require("./deliveryFee.model"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const CreateFee = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = [];
    for (const { country, phoneCode, code } of deliveryFee_constant_1.countriesWithCodes) {
        const states = [];
        for (const state of country_state_city_1.State.getStatesOfCountry(code)) {
            const cities = country_state_city_1.City.getCitiesOfState(code, state.isoCode);
            if (cities.length > 0) {
                const delivery_fee = 10;
                const stateCities = cities.map((city) => ({
                    city_name: city.name,
                    delivery_fee,
                }));
                states.push({
                    state_name: state.name,
                    state_code: state.isoCode,
                    cities: stateCities,
                });
            }
            else {
                const delivery_fee = 10;
                states.push({
                    state_name: state.name,
                    state_code: state.isoCode,
                    delivery_fee,
                });
            }
        }
        data.push({ country, country_code: code, phoneCode, states });
    }
    if (data.length === 0) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'No data found');
    }
    const deliveryFeeData = yield deliveryFee_model_1.default.create(data);
    if (!deliveryFeeData) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Delivery fee not created');
    }
    return deliveryFeeData;
});
const updateFee = (id, dataPayload) => __awaiter(void 0, void 0, void 0, function* () {
    const { state_code, city_name, delivery_fee } = dataPayload;
    // Find the country and its corresponding states based on the provided id
    const country = yield deliveryFee_model_1.default.findById(id);
    if (!country) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Country not found');
    }
    // Find the matching state based on the provided state_code
    const state = country.states.find(state => state.state_code === state_code);
    if (!state) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'State not found');
    }
    // If city_name is provided, update the delivery_fee for the matching city
    if (city_name) {
        if (state.cities) {
            const city = state.cities.find(city => city.city_name === city_name);
            if (!city) {
                throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'City not found');
            }
            city.delivery_fee = delivery_fee;
            // Update the delivery_fee in the database
            yield deliveryFee_model_1.default.findOneAndUpdate({
                _id: id,
                'states.state_code': state_code,
                'states.cities.city_name': city_name,
            }, {
                $set: {
                    'states.$[outer].cities.$[inner].delivery_fee': delivery_fee,
                },
            }, {
                arrayFilters: [
                    { 'outer.state_code': state_code },
                    { 'inner.city_name': city_name },
                ],
            });
            // Return the delivery_fee and the updated city
            return [
                {
                    country: country.country,
                    country_code: country.country_code,
                    phoneCode: country.phoneCode,
                    states: [
                        {
                            state_name: state.state_name,
                            state_code: state.state_code,
                            cities: [city],
                        },
                    ],
                },
            ];
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Cities not available for the state');
        }
    }
    else {
        // If city_name is not provided, update the delivery_fee for the state
        state.delivery_fee = delivery_fee;
        // Update the delivery_fee in the database
        yield deliveryFee_model_1.default.findOneAndUpdate({ _id: id, 'states.state_code': state_code }, { $set: { 'states.$.delivery_fee': delivery_fee } });
        // Return the delivery_fee and the state
        return [
            {
                country: country.country,
                country_code: country.country_code,
                phoneCode: country.phoneCode,
                states: [state],
            },
        ];
    }
});
const getAllFees = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield deliveryFee_model_1.default.find();
    if (!data) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'No data found');
    }
    return data;
});
const getFeeOfLocation = (countryId, stateCode, city_name) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const fullData = yield deliveryFee_model_1.default.findById(countryId);
    if (!fullData) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Country not found');
    }
    const state = fullData.states.find(state => {
        return state.state_code === stateCode;
    });
    if (!state) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'State not found');
    }
    if (((_a = state.cities) === null || _a === void 0 ? void 0 : _a.length) && city_name) {
        const city = state.cities.find(city => city.city_name === city_name);
        if (!city) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'City not found');
        }
        return {
            country: fullData.country,
            delivery_fee: (_b = city.delivery_fee) !== null && _b !== void 0 ? _b : 0,
            city_name: city.city_name,
            state_name: state.state_name,
        };
    }
    else {
        return {
            country: fullData.country,
            delivery_fee: (_c = state.delivery_fee) !== null && _c !== void 0 ? _c : 0,
            state_name: state.state_name,
        };
    }
});
exports.DeliveryFeeService = {
    CreateFee,
    updateFee,
    getAllFees,
    getFeeOfLocation,
};
