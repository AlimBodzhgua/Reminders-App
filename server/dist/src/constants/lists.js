"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialLists = void 0;
const List_1 = __importDefault(require("../models/List"));
const today = new List_1.default({
    name: 'Today',
    color: 'blue',
    icon: 'UnorderedListOutlined',
    pinned: true,
    _isMutable: false,
    sortField: 'creation',
    sortDirection: 'asc',
    reminders: [],
});
const scheduled = new List_1.default({
    name: 'Scheduled',
    color: 'red',
    icon: 'CalendarOutlined',
    pinned: true,
    _isMutable: false,
    sortField: 'creation',
    sortDirection: 'asc',
    reminders: [],
});
const all = new List_1.default({
    name: 'All',
    color: 'grey',
    icon: 'InboxOutlined',
    pinned: true,
    _isMutable: false,
    sortField: 'creation',
    sortDirection: 'asc',
    reminders: [],
});
const flagged = new List_1.default({
    name: 'Flagged',
    color: '#ff6600',
    icon: 'FlagFilled',
    pinned: true,
    isMutable: false,
    sortField: 'creation',
    sortDirection: 'asc',
    reminders: [],
});
const completed = new List_1.default({
    name: 'Completed',
    color: '#000',
    icon: 'CheckOutlined',
    pinned: true,
    _isMutable: false,
    sortField: 'creation',
    sortDirection: 'asc',
    reminders: [],
});
exports.initialLists = [
    today,
    scheduled,
    flagged,
    completed,
    all,
];
