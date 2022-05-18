import mongoose from "mongoose";


const connString = 'mongodb+srv://lgancarczyk:6N7XM4zs2695b6gQ@cluster0.iebgt.mongodb.net/notekeep?retryWrites=true&w=majority'


export async function dbmain() {
    console.log('Connecting to mongo');
    const db = await mongoose.connect(connString)
    console.log('Mongo Connected!')

}