"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_FILTER_FIELDS = exports.USER_SEARCH_FIELDS = exports.USER_ROLE_ARRAY = exports.USER_ROLE_ENUM = void 0;
/* eslint-disable no-unused-vars */
var USER_ROLE_ENUM;
(function (USER_ROLE_ENUM) {
    USER_ROLE_ENUM["ADMIN"] = "admin";
    USER_ROLE_ENUM["USER"] = "user";
})(USER_ROLE_ENUM = exports.USER_ROLE_ENUM || (exports.USER_ROLE_ENUM = {}));
exports.USER_ROLE_ARRAY = Object.values(USER_ROLE_ENUM);
exports.USER_SEARCH_FIELDS = ['name', 'email', 'phone', 'address'];
exports.USER_FILTER_FIELDS = ['role', 'isVerified'];
