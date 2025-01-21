"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./src/routes"));
const errorHandler_1 = __importDefault(require("./src/middleware/errorHandler"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.default);
app.use(errorHandler_1.default);
const DATABASE = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
mongoose_1.default
    .connect(DATABASE)
    .then(() => console.log('DB Connection successful'))
    .catch((error) => console.log('DB Connection failed', error));
app.get('/', (req, res) => {
    return res.send({ message: 'Hello World' });
});
app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}/`);
});
