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
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeConsent = exports.getConsentCustomized = exports.findByDocument = exports.findById = exports.updateConsent = exports.createConsent = void 0;
const Consent_1 = require("../models/Consent");
const Permissions_1 = require("../models/Permissions");
const PermissionService = __importStar(require("../services/PermissionService"));
const crypto_1 = require("crypto");
const createConsent = (consent, identification) => __awaiter(void 0, void 0, void 0, function* () {
    const [hasConsent] = yield Consent_1.Consent.findOrCreate({
        where: { identification },
        defaults: { consent, consentId: "urn:mapfre:" + (0, crypto_1.randomUUID)(), identification }
    });
    return hasConsent;
});
exports.createConsent = createConsent;
const updateConsent = (id, newInfos) => __awaiter(void 0, void 0, void 0, function* () {
    let consent = yield Consent_1.Consent.findOne({ where: { consentId: id } });
    if (consent) {
        yield Consent_1.Consent.update({ status: newInfos }, { where: { consentId: id } });
    }
    return yield Consent_1.Consent.findOne({
        where: { consentId: id },
        attributes: ["consentId", "status", "identification", "createdAt", "updatedAt"],
    });
});
exports.updateConsent = updateConsent;
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const consent = yield Consent_1.Consent.findOne({
        where: { consentId: id }
    });
    if (consent) {
        const permissions = yield Permissions_1.Permission.findOne({
            where: { idConsent: consent === null || consent === void 0 ? void 0 : consent.id }
        });
        return { consent, permissions };
    }
    else {
        return null;
    }
});
exports.findById = findById;
const findByDocument = (document) => __awaiter(void 0, void 0, void 0, function* () {
    const consent = yield Consent_1.Consent.findOne({
        where: { identification: document },
        attributes: ["consentId", "status", "identification", "createdAt", "updatedAt"]
    });
    const permissions = yield Permissions_1.Permission.findOne({ where: { identificationUser: document },
        attributes: ["permissions"]
    });
    return { consent, permissions };
});
exports.findByDocument = findByDocument;
const getConsentCustomized = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Consent_1.Consent.findOne({
        where: { id },
        attributes: ["consentId", "status", "identification", "createdAt", "updatedAt"]
    });
});
exports.getConsentCustomized = getConsentCustomized;
const removeConsent = (id, identification) => __awaiter(void 0, void 0, void 0, function* () {
    const consent = yield Consent_1.Consent.findOne({ where: { consentId: id } }).toString();
    if (consent) {
        yield PermissionService.removePermission(identification);
        yield Consent_1.Consent.destroy({ where: { identification } });
        return true;
    }
    else {
        return false;
    }
});
exports.removeConsent = removeConsent;
