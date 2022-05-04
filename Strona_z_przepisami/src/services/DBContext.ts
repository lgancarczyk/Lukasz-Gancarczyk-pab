import { ChangeStreamDocument } from "mongodb";
import mongoose from "mongoose";
//import { recipeSchema } from "../dbSchemas/recipeSchema";


const connString = 'mongodb+srv://lgancarczyk:6N7XM4zs2695b6gQ@cluster0.iebgt.mongodb.net/cookBookSite?retryWrites=true&w=majority'

//export const recipeModel = mongoose.model('recipes', recipeSchema)

export async function dbmain() {
    // 1. Przygotowanie komunikacji - połączenie z bazą danych
    console.log('Connecting to mongo');
    const db = await mongoose.connect(connString)
    console.log('Mongo Connected!')

    // 2. Przygotowanie komunikacji - tworzenie schema z modelu
    //const recipeModel = mongoose.model('recipes', recipeSchema)
}