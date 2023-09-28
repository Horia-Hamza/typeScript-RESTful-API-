"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const jsonwebtoken_1 = __importStar(require("jsonwebtoken")); // Import TokenExpiredError for handling token expiration
const user_1 = __importDefault(require("../../DB/models/user"));
const errorHandling_js_1 = require("../services/errorHandling.js");
exports.roles = {
    Admin: "Admin",
    User: "User",
    Vendor: "Vendor",
};
const auth = (accessRoles = [exports.roles.User]) => {
    return (0, errorHandling_js_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { authorization } = req.headers;
        try {
            if (!(authorization === null || authorization === void 0 ? void 0 : authorization.startsWith(process.env.bearerKey))) {
                throw new Error("Invalid token or bearer key");
            }
            else {
                const token = authorization.split(process.env.bearerKey)[1];
                const decoded = jsonwebtoken_1.default.verify(token, process.env.tokenSignature);
                if (!(decoded === null || decoded === void 0 ? void 0 : decoded.id) || !(decoded === null || decoded === void 0 ? void 0 : decoded.isLoggedIn)) {
                    throw new Error("Invalid token payload");
                }
                else {
                    const user = yield user_1.default.findById(decoded.id);
                    if (!user) {
                        throw new Error("Not registered user");
                    }
                    else {
                        if (!accessRoles.includes(user.role)) {
                            throw new Error("Unauthorized user");
                        }
                        else {
                            req.user = user;
                            return next();
                        }
                    }
                }
            }
        }
        catch (error) {
            // Handle JWT-related errors here
            if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                // Handle token expiration error
                console.log("Token has expired");
                return res.status(401).json({ message: "Token has expired" });
            }
            else {
                error.cause = 403;
                return next(error);
            }
        }
    }));
};
exports.auth = auth;
//# sourceMappingURL=authentication.js.map