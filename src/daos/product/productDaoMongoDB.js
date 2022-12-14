import mongoClient from "../../containers/mongoContainer.js";
import mongoose from "mongoose";

export default class ProductsDaoMongoDB extends mongoClient {
    constructor() {
        super(
            "product",
            new mongoose.Schema({
                title: { type: String, required: true },
                description: { type: String, required: true },
                code: { type: Number, required: true, unique: true, min: 0 },
                thumbnail: { type: String, required: true },
                price: { type: Number, required: true, min: 0 },
                timestamps: { type: Date },
            })
        );
    }
}
