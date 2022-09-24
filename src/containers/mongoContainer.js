import mongoose from "mongoose";
import logger from "../utils/logger.js";

class mongoClient {
    constructor(collection, schema) {
        this.collection = mongoose.model(collection, schema);
    }

    async getAll() {
        try {
            return await this.collection.find({}, { __v: 0 });
        } catch (error) {
            logger.error(`ERROR AL USAR: getAll: ${error}`);
        }
    }

    async getById(id) {
        try {
            const data = await this.getAll();
            if (data) {
                let obj = await this.collection.find({ _id: id }, { __v: 0 });
                if (obj) return obj[0];
                return null;
            }
        } catch (error) {
            logger.error(`ERROR AL USAR: getById: ${error}`);
        }
    }

    async add(data) {
        try {
            return await this.collection({ ...data }).save();
        } catch (error) {
            logger.error(`ERROR AL USAR: add: ${error}`);
        }
    }

    async editById(id, obj) {
        try {
            const dataUpdate = await this.collection.findByIdAndUpdate(
                id,
                obj,
                {
                    new: true,
                }
            );
            return dataUpdate;
        } catch (error) {
            logger.error(`ERROR AL USAR: editById: ${error}`);
        }
    }
    async deleteById(id) {
        try {
            return await this.collection.deleteOne({ _id: id });
        } catch (error) {
            logger.error(`ERROR AL USAR: deleteById: ${error}`);
        }
    }

    async deleteAll() {
        try {
            return await this.collection.deleteMany();
        } catch (error) {
            logger.error(`ERROR AL USAR: deleteAll: ${error}`);
        }
    }

    async ifExists(objData) {
        try {
            const obj = await this.collection.findOne(objData);
            if (obj) return true;
            return false;
        } catch (error) {
            logger.error(`ERROR AL USAR: ifExist: ${error}`);
        }
    }
}

export default mongoClient;
