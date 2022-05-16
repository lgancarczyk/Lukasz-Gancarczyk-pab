import mongoose from "mongoose";

var rateSchema = new mongoose.Schema({
    Rate: {type:Number, min:[1, 'min rate is 1'], max:[5, 'max rate is 5']},
    RateUserId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
}, { _id : false });

// var commentSchema = new mongoose.Schema({
//     Rate: {type:Number, min:[1, 'min rate is 1'], max:[5, 'max rate is 5']},
//     RateUserId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
// }, { _id : false });

const recipeSchema = new mongoose.Schema({
    //ReicpeId: { type:String, required:true, unique:true, index:true, default:mongoose.Types.ObjectId },
    UserId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    //UserId: {type: String, required: true},
    Title: { type: String, required: true },
    NoOfPortions: { type: Number },
    CookingTime: { type: Number, required: true },
    Ingredients: { type: [String], required: true },
    Instruction: { type: String, required: true },
    Tags: { type: [String], required: true },
    Rates:[rateSchema]
    },
    {
        timestamps: true
    })
const Recipe = mongoose.model('recipe', recipeSchema)

module.exports = Recipe

