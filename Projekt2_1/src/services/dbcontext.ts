import { ChangeStreamDocument } from "mongodb";
import mongoose from "mongoose";

const connString = 'mongodb+srv://lgancarczyk:V4c48O5Q0E2dhjrH@cluster0.iebgt.mongodb.net/notesDB?retryWrites=true&w=majority'

const notesSchema = new mongoose.Schema({
    id: Object,
    title: String,
    content: String,
    private: Boolean,
    tags: [String]
}, {
    timestamps: true
})
export async function main() {
    // 1. Przygotowanie komunikacji - połączenie z bazą danych
    console.log('Connecting to mongo');
    const db = await mongoose.connect(connString)
    console.log('Mongo Connected!')

    // // 2. Przygotowanie komunikacji - tworzenie schema z modelu
    // const noteModel = mongoose.model('notes', notesSchema)
}