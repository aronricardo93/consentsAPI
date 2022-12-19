"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
const doc = {
    info: {
        title: "API Consents - Open Insurance Brazil",
        description: "API that deals with the creation, consultation and revocation of consents for Open Insurance Brasil Fase 2",
        version: "2.0.0"
    },
    host: 'https://consent-api.up.railway.app/',
    schemes: ['http'],
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'authorization',
            in: 'header'
        }
    }
};
const outputFile = './src/swagger_output.json';
const endpointsFiles = ['./src/routes/consentRouter.ts', './src/routes/userRouter.ts'];
(0, swagger_autogen_1.default)(outputFile, endpointsFiles, doc);
