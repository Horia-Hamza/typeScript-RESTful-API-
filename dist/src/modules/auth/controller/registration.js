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
exports.signin = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../../../../DB/models/user"));
const errorHandling_1 = require("../../../services/errorHandling");
exports.signup = (0, errorHandling_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_1.default.findOne({ email });
    if (user) {
        const error = new Error("Email already exists");
        error.cause = 200;
        next(error);
    }
    else {
        const hash = yield bcryptjs_1.default.hash(password, parseInt(process.env.saltRound));
        const user = {
            userName: req.body.userName,
            email: req.body.email,
            password: hash,
            role: req.body.role
        };
        const newUser = new user_1.default(user);
        const savedUser = yield newUser.save();
        res.status(201).json({ message: "Done", id: savedUser });
    }
}));
exports.signin = (0, errorHandling_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_1.default.findOne({ email });
    if (!user) {
        const error = new Error("email does not exist");
        error.cause = 404;
        next(error);
    }
    else {
        const compare = bcryptjs_1.default.compareSync(password, user.password);
        if (!compare) {
            const error = new Error("wrong password");
            error.cause = 404;
            next(error);
        }
        else {
            const tokenSignature = process.env.tokenSignature || 'defaultSecret';
            const token = jsonwebtoken_1.default.sign({ id: user._id, isLoggedIn: true }, tokenSignature, { expiresIn: 60 * 60 * 24 });
            res.status(200).json({ message: "Done", token });
        }
    }
}));
//# sourceMappingURL=registration.js.map