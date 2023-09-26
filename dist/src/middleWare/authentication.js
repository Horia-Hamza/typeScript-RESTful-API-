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
exports.auth = exports.roles = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../../DB/models/user"));
const errorHandling_js_1 = require("../services/errorHandling.js");
exports.roles = {
    Admin: "Admin",
    User: "User",
    Vendor: "Vendor"
};
const auth = (accessRoles = [exports.roles.User]) => {
    return (0, errorHandling_js_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { authorization } = req.headers;
        if (!(authorization === null || authorization === void 0 ? void 0 : authorization.startsWith(process.env.bearerKey))) {
            const error = new Error("in-valid token or bearer key");
            error.cause = 200;
            next(error);
        }
        else {
            const token = authorization.split(process.env.bearerKey)[1];
            const decoded = jsonwebtoken_1.default.verify(token, process.env.tokenSignature);
            if (!(decoded === null || decoded === void 0 ? void 0 : decoded.id) || !(decoded === null || decoded === void 0 ? void 0 : decoded.isLoggedIn)) {
                const error = new Error("in-valid token payload");
                error.cause = 200;
                next(error);
            }
            else {
                const user = yield user_1.default.findById(decoded.id);
                if (!user) {
                    const error = new Error("Not register user");
                    error.cause = 401;
                    next(error);
                }
                else {
                    if (!accessRoles.includes(user.role)) {
                        const error = new Error("Un-authorized user");
                        error.cause = 403;
                        next(error);
                    }
                    else {
                        req.user = user;
                        next();
                    }
                }
            }
        }
    }));
};
exports.auth = auth;
//# sourceMappingURL=authentication.js.map