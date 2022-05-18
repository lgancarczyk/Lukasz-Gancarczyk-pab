import mongoose from "mongoose";
import { dbmain } from "./DBContext";
const Note = require('../dbSchemas/noteSchema')


export class NoteService {

    async AddNote(_userId:any,_title:string, _content:string, _private:boolean, _tags:Array<string>) {
        

        try {
                let lowerTags: Array<string> = new Array<string>()

                _tags.forEach(element => {
                lowerTags.push(element.toLocaleLowerCase())
                });
                const newNote = new Note({
                    UserId: _userId,
                    Title: _title,
                    Content: _content,
                    Private: _private,
                    Tags: lowerTags
            })
    
            const saveRet = await newNote.save(); 
            return newNote.id;
        } 
        catch (e) {
            throw e
        }
          
    }

    async GetNotes()
    {
        try{
            let notes = await Note.find({Private: false})
            return notes
        }
        catch(e){
            throw e
        }
    }

    async GetNoteById(id:any)
    {
        try{
            let note = await Note.findById(id)
            return note
        }
        catch(e){
            throw e
        }
    }

    async GetByTag(tag:string)
    {
        let notes = await Note.find({ Tags: tag })
        return notes
    }

    async GetByUserId(id:any, userId:any)
    {
        if(userId==id)
        {
            let notes = await Note.find({ UserId:id })
            return notes
        }
        else
        {
            let notes = await Note.find({ UserId:id , Private: false})
            return notes
        }

    }

    async DeleteNote(id:any)
    {
        try
        {
            await Note.findByIdAndRemove(id)
        }
        catch(e)
        {
            throw e
        }
    }

}