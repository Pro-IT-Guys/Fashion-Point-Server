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
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const offer_model_1 = __importDefault(require("./app/modules/offer/offer.model"));
const cornJobs_1 = require("./app/helpers/cornJobs");
let server;
// Socket start ====================================================================>>>
/* eslint-disable @typescript-eslint/no-var-requires */
const io = require('socket.io')(8080, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});
const activeUsers = new Map();
io.on('connection', (socket) => {
    socket.on('join', (userId) => {
        if (userId && !activeUsers.has(userId)) {
            activeUsers.set(userId, socket.id);
        }
        io.emit('activeUsers', Array.from(activeUsers.keys()));
    });
    socket.on('sendMessage', (data) => {
        const receiverId = data.receiverId;
        const receiverSocketId = activeUsers.get(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('getMessage', data);
        }
    });
    // Get cart data from client
    socket.on('cartData', (data) => {
        const receiverId = data.data.userId;
        const receiverSocketId = activeUsers.get(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('getCartData', data.data);
        }
    });
    socket.on('disconnect', () => {
        for (const [userId, socketId] of activeUsers.entries()) {
            if (socketId === socket.id) {
                activeUsers.delete(userId);
                break;
            }
        }
        io.emit('activeUsers', Array.from(activeUsers.keys()));
    });
});
// Socket end ====================================================================>>>
/* This code is setting up a listener for uncaught exception. It's a synchronous process */
process.on('uncaughtException', error => {
    console.log(error);
    process.exit(1);
});
/* This code is setting up a listener for unhandled promise rejections. It's a asynchronous process */
process.on('unhandledRejection', error => {
    if (server) {
        server.close(() => {
            console.log(error);
            process.exit(1);
        });
    }
});
/* `process.on('SIGTERM', () => {...})` sets up a listener for the SIGTERM signal, which is a signal
sent to a process to request its termination. When this signal is received, the code inside the
listener function is executed. In this case, if the `server` variable is defined (meaning the server
is running), it is closed and a success message is logged. This is a way to gracefully shut down the
server when the process is terminated, such as when the application is deployed to a cloud platform
and needs to be scaled down or updated. */
process.on('SIGTERM', () => {
    if (server) {
        server.close(() => {
            console.log('Process terminated');
        });
    }
});
function databaseConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.database_string);
            if (config_1.default.env === 'development') {
                console.log('Database connected successfully');
            }
            else {
                console.log('Database connected successfully');
            }
            server = app_1.default.listen(config_1.default.port, () => __awaiter(this, void 0, void 0, function* () {
                if (config_1.default.env === 'development') {
                    console.log(`Server is listening on port ${config_1.default.port}`);
                }
                else {
                    console.log(`Server is listening on port ${config_1.default.port}`);
                }
                const currentDate = new Date();
                const nearestOffer = yield offer_model_1.default
                    .findOne({ startFrom: { $gte: currentDate } })
                    .sort({ startFrom: 1 })
                    .exec();
                if (nearestOffer) {
                    // Schedule the cron jobs with the nearest offer data
                    (0, cornJobs_1.scheduleCronJobs)(nearestOffer);
                    console.log(`Cron jobs scheduled successfully and will execute at ${nearestOffer.startFrom}`);
                }
                else {
                    console.log('No nearest offer found.');
                }
            }));
        }
        catch (error) {
            console.log('Error while connecting database: ', error);
        }
    });
}
databaseConnection();
