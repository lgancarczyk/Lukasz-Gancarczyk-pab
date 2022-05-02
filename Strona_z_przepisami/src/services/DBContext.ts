import { ChangeStreamDocument } from "mongodb";
import mongoose from "mongoose";

const connString = 'mongodb+srv://lgancarczyk:6N7XM4zs2695b6gQ@cluster0.iebgt.mongodb.net/cookBookSite?retryWrites=true&w=majority'


const recipeSchema = new mongoose.Schema({
    ReicpeId: { type:String, required:true, unique:true, index:true, default:mongoose.Types.ObjectId },
    //UserId: 
    Title: {type:String, required: true},
    NoOfPortions: {type: Number},
    CookingTime: {type: Number, required:true},
    //Ingredients: [{}],
    Instruction: {type: String, required: true},
    //Tags[]
},
{
    timestamps: true
})

export async function dbmain() {
    // 1. Przygotowanie komunikacji - połączenie z bazą danych
    console.log('Connecting to mongo');
    const db = await mongoose.connect(connString)
    console.log('Mongo Connected!')

    // 2. Przygotowanie komunikacji - tworzenie schema z modelu
    const recipeModel = mongoose.model('recipes', recipeSchema)
}