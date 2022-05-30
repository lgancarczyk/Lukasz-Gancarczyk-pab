import mongoose from "mongoose";

var rateSchema = new mongoose.Schema({
    Rate: {type:Number, min:[1, 'min rate is 1'], max:[5, 'max rate is 5']},
    RateUserId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
}, { _id : false });

var commentSchema = new mongoose.Schema({
    Comment: {type:String, required: true},
    CommentUserId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
});

const recipeSchema = new mongoose.Schema({
    UserId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    Title: { type: String, required: true },
    NoOfPortions: { type: Number },
    CookingTime: { type: Number, required: true },
    Ingredients: { type: [String], required: true },
    Instruction: { type: String, required: true },
    Tags: { type: [String], required: true },
    Rates:[rateSchema],
    Comments:[commentSchema]
    },
    {
        timestamps: true
    })
const Recipe = mongoose.model('recipe', recipeSchema)

module.exports = Recipe

