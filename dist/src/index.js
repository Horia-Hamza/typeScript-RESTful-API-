"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_router_1 = require("./modules/auth/auth.router");
const product_router_1 = require("./modules/product/product.router");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("../config");
const errorHandling_1 = require("./services/errorHandling");
const connection_1 = require("../DB/connection");
dotenv_1.default.config();
if (config_1.config.nodeEnv === "DEV") {
    console.log("Running in development mode");
}
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Convert Buffer Data
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Set up cors
app.use((0, cors_1.default)());
// Base URL
const baseUrl = process.env.BASEURL;
// Set up API routing
app.use(`${baseUrl}/auth`, auth_router_1.authRouter);
app.use(`${baseUrl}/product`, product_router_1.productRouter);
// In-valid Routing
app.use("*", (req, res) => {
    res.status(404).send("page not found");
});
// Global Handling Error
app.use(errorHandling_1.globalError);
// Connection DB
(0, connection_1.connectDB)();
app.listen(port, () => {
    console.log(`Server is running on port.....${port}`);
});
//# sourceMappingURL=index.js.map