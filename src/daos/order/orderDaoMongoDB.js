import mongoClient from "../../containers/mongoContainer.js";
import mongoose from "mongoose";

export default class OrdersDaoMongoDB extends mongoClient {
    constructor() {
        super(
            "order",
            new mongoose.Schema({
                timestamps: { type: Date },
                userId: { type: String, required: true },
                products: Array,
            })
        );
    }
}
