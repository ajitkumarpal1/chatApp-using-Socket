"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const mongoose_js_1 = require("./mongoose.js");
const mongoos_model_js_1 = require("./mongoos.model.js");
const app = (0, express_1.default)(); // Create an instance of Express
const server = http_1.default.createServer(app);
const mongooseModel = mongoos_model_js_1.mongooseModel;
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
app.use(express_1.default.static("public"));
const liseUserArray = [];
/* connect individual user */
io.on("connect", (socket) => {
    socket.emit("oldUser", liseUserArray);
    console.log("socked is connected");
    /* listaion adduser request */
    socket.on("addUser", (userName) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(userName);
        socket.userName = userName;
        io.emit("newUser", socket.userName);
        liseUserArray.push(userName);
        socket.emit("oldChat", yield mongooseModel.find({}));
    }));
    socket.on("addChat", (chatObj) => __awaiter(void 0, void 0, void 0, function* () {
        chatObj.user = socket.userName;
        try {
            const chat = yield mongooseModel(chatObj).save();
            console.log(chatObj);
            io.emit("chatBrodCast", chat);
        }
        catch (error) {
        }
    }));
    /* after disconnection process */
    socket.on("disconnect", () => {
        console.log(`${socket.userName} is desconnected`);
        if (liseUserArray.indexOf(socket.userName) !== -1) {
            liseUserArray.splice(liseUserArray.indexOf(socket.userName), 1);
        }
        io.emit("offline", socket.userName);
    });
    /* typing  */
    socket.on("typing", () => {
        console.log(socket.userName + " is typing ...");
        socket.broadcast.emit("typeUser", (socket.userName).toString());
    });
    socket.on("notTyping", () => {
        console.log(socket.userName + " is stopd typing ...");
        socket.broadcast.emit("notTypeUser", (socket.userName).toString());
    });
});
server.listen(3100, () => {
    console.log("sorver is runig on port 3100");
    (0, mongoose_js_1.connectDb)();
});
