import mongoClient from "../../containers/mongoContainer.js";
import mongoose from "mongoose";

import logger from "../../utils/logger.js";

export default class UsersDaoMongoDB extends mongoClient {
    constructor() {
        super(
            "user",
            new mongoose.Schema({
                userEmail: { type: String, required: true, unique: true },
                password: { type: String, required: true },
                userName: { type: String, required: true },
                userPhone: { type: Number, required: true },
                userAddress: { type: String, required: true },
                userRole: {
                    type: String,
                    enum: ["user", "admin"],
                    default: "user",
                },
                timestamps: { type: Date },
                userPhoto: { type: String, required: true },
            })
        );
    }

    async findUser(useremail) {
        try {
            const user = await this.collection.findOne({
                userEmail: useremail,
            });
            return user;
        } catch (error) {
            logger.error(`Error al buscar usuario: ${error}`);
        }
    }
}
