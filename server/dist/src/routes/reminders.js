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
const express_1 = require("express");
const validations_1 = require("../validations/validations");
const ReminderController = __importStar(require("../controllers/ReminderContoller"));
const requireAuth_1 = __importDefault(require("../middleware/requireAuth"));
const router = (0, express_1.Router)({ mergeParams: true });
// /lists/:listId/reminders
router.post('/', requireAuth_1.default, validations_1.reminderCreateValidation, ReminderController.create);
router.get('/', requireAuth_1.default, ReminderController.getAll);
router.get('/:id', requireAuth_1.default, ReminderController.getOne);
router.delete('/', requireAuth_1.default, ReminderController.removeAll);
router.delete('/:id', requireAuth_1.default, ReminderController.remove);
router.patch('/:id', requireAuth_1.default, validations_1.reminderUpdateValidation, ReminderController.update);
router.post('/all', requireAuth_1.default, validations_1.allRemindersUpdateValidation, ReminderController.updateAll);
exports.default = router;
