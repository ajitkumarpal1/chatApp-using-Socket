"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongooseScima = new mongoose_1.default.Schema({
    user: String,
    message: String,
    time: {
        type: Date,
        default: Date()
    }
});
const mongooseModel = mongoose_1.default.model('chate', mongooseScima);
exports.mongooseModel = mongooseModel;
