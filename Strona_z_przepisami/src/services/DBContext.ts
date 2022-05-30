import mongoose from "mongoose";
var settings = require('../settings.json');



const connString = `mongodb+srv://lgancarczyk:${settings.mongoPassword}@cluster0.iebgt.mongodb.net/cookBookSite?retryWrites=true&w=majority`


export async function dbmain() {
    console.log('Connecting to mongo');
    const db = await mongoose.connect(connString)
    console.log('Mongo Connected!')


}