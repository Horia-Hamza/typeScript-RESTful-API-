"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connection_1 = require("../DB/connection");
const auth_router_1 = require("./modules/auth/auth.router");
const product_router_1 = require("./modules/product/product.router");
const errorHandling_1 = require("./services/errorHandling");
const config_1 = require("../config");
dotenv_1.default.config();
if (config_1.config.nodeEnv === 'DEV') {
    console.log('Running in development mode');
}
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT || 5000;
const baseUrl = process.env.BASEURL;
app.use(`${baseUrl}/auth`, auth_router_1.authRouter);
app.use(`${baseUrl}/product`, product_router_1.productRouter);
app.use("*", (req, res) => {
    res.status(200).send("page not found");
});
app.listen(port, () => {
    console.log(`Server is running on port.....${port}`);
});
//global handling Error
app.use(errorHandling_1.globalError);
(0, connection_1.connectDB)();
//# sourceMappingURL=app.js.map