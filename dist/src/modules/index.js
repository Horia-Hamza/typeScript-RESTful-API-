"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("../../config");
dotenv_1.default.config();
if (config_1.config.nodeEnv === 'DEV') {
    console.log('Running in development mode');
}
const connection_1 = require("../../DB/connection");
const errorHandling_1 = require("../services/errorHandling");
const appRouter = (appExpress) => {
    const app = (0, express_1.default)();
    // Convert Buffer Data
    app.use(express_1.default.json());
    //   // Base URL
    //   const baseUrl = process.env.BASEURL;
    //   // Set up API routing
    //   app.use(`${baseUrl}/auth`, authRouter);
    //   app.use(`${baseUrl}/product`, productRouter);
    //   // In-valid Routing
    //   app.use("*", (req: Request, res: Response) => {
    //     res.status(404).send("page not found");
    //   });
    // Global Handling Error
    app.use(errorHandling_1.globalError);
    // Connection DB
    (0, connection_1.connectDB)();
};
exports.appRouter = appRouter;
//# sourceMappingURL=index.js.map