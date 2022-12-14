import mongoClient from "../../containers/mongoContainer.js";
import mongoose from "mongoose";

export default class ChatsDaoMongoDB extends mongoClient {
    constructor() {
        super(
            "chat",
            new mongoose.Schema({
                author: {
                    id: { type: String, required: true },
                    name: { type: String, required: true },
                    lastname: { type: String, required: true },
                },
                date: { type: String, required: true },
                message: { type: String, required: true },
            })
        );
    }
}
