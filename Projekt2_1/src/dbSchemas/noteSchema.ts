import mongoose from "mongoose";


const noteSchema = new mongoose.Schema({
    UserId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    Title: { type: String, required: true },
    Content: { type: String, required: true },
    Private: {type:Boolean, required: true},
    Tags: { type: [String], required: true },
    },
    {
        timestamps: true
    })
const Note = mongoose.model('note', noteSchema)

module.exports = Note

