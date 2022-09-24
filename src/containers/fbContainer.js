import admin from "firebase-admin";
import config from "../configs/config.js";

admin.initializeApp(config.firebase);

class firebaseClient {
    constructor(userSchema, tabla) {
        this.tabla = tabla;
        this.db = admin.firestore();
        this.query = this.db.collection(tabla);
    }

    async createTableMessages() {
        console.log("Create");
    }

    async createTableProducts() {
        console.log("Create");
    }

    async getAll() {
        const querySnapshot = await this.query.get();
        let docs = querySnapshot.docs;
        const response = docs.map((doc) => ({
            title: doc.data().title,
            price: doc.data().price,
            thumbnail: doc.data().thumbnail
        }));
        return response;
    }
    async getAllM() {
        const querySnapshot = await this.query.get();
        let docs = querySnapshot.docs;
        const response = docs.map((doc) => ({
            author: doc.data().author,
            text: doc.data().text,
            date: doc.data().date
        }));
        return response;
    }

    async save(elem) {
        let doc = this.query.doc()
        return await doc.create(elem)
    }
}

export default firebaseClient;