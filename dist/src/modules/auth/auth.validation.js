"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.token = exports.signin = exports.signup = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signup = {
    body: joi_1.default.object().required().keys({
        userName: joi_1.default.string().pattern(new RegExp(/[a-zA-Z\u0621-\u064Aء-ئ][^#&<>\"~;$^%{}?]{2,20}$/)).min(2).max(20).required().messages({
            'any.required': 'Plz enter your username',
            'string.base': 'Only char is acceptable',
        }),
        email: joi_1.default.string().email().required(),
        role: joi_1.default.string(),
        password: joi_1.default.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{3,}$/)).required(),
        cPassword: joi_1.default.string().valid(joi_1.default.ref('password')).required()
    })
};
exports.signin = {
    body: joi_1.default.object().required().keys({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{3,}$/)).required()
    })
};
exports.token = {
    params: joi_1.default.object().required().keys({
        token: joi_1.default.string().required(),
    })
};
//# sourceMappingURL=auth.validation.js.map