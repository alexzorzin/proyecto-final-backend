import express from "express";
import http from "http";
import { Server } from "socket.io";
const app = express();
const server = http.createServer(app);
const io = new Server(server);
import config from "../configs/config.js";
import ChatApi from "../services/chat.js";
const chat = new ChatApi();
import logger from "../utils/logger.js";
import firebaseClient from "../containers/fbContainer.js";
export let selectedProducts = [];
export let totalPrice = [];

const messagesApi = new firebaseClient(config.firebase, "mensajes");
const messages = []
const lastMessage = async () => {
    try {
        if (messages.length == 0) {
            messages.push(await messagesApi.getAllM())
        }
        else {
            await messagesApi.createTableMessages()
            await messagesApi.save(messages[0])
        }
    }
    catch (error) {
        logger.error(error);
    }
}
lastMessage()

function ioConnect(socket) {
    socket.emit('messages', messages[0]);
    socket.on("new-message", message => {
        try {
            messages[0].push(message);
            io.sockets.emit('messages', messages[0]);
            messagesApi.save(message);
        } catch (error) {
            logger.error(error);
        }
    });

    socket.on('selectedProducts', data => {
        selectedProducts = data;
    })

    socket.on('totalPrice', data => {
        totalPrice = data;
    })

    socket.on("disconnect", () => {
        try {
            chat.deleteAll();
            // logger.info("Usuario Desconectado");
        } catch (error) {
            logger.error(error);
        }
    });
};


export default ioConnect;