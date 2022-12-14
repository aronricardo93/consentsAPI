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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_output_json_1 = __importDefault(require("./swagger_output.json"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const consentRouter_1 = __importDefault(require("./routes/consentRouter"));
dotenv.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "*" }));
app.use(passport_1.default.initialize());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/open-insurance/v1/doc', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
app.use('/open-insurance/consents/v1', userRouter_1.default);
app.use('/open-insurance/consents/v1', consentRouter_1.default);
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found!' });
});
app.listen(process.env.PORT, () => console.log("Server running..."));
