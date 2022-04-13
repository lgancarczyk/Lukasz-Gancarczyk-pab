import { TagsService } from './tagsService';
import { FileManager } from "./fileManager"
import {Tag} from '../models/tag'
import Note from '../models/note';
import { NoteViewModel } from '../models/noteViewModel';




export class NotesService
{
    private readonly _tagsService:TagsService
    private readonly _fileManager:FileManager
    constructor()
    {
        this._tagsService = new TagsService()
        this._fileManager = new FileManager()
    }

    AddNote(title: string = " ", content: string = "", tags:Array<Tag> = [])
    {
        let tagIds: Array<number> = new Array()
        tags.forEach(element => {
            let tagId = this._tagsService.AddTag(element)
            tagIds.push(tagId)
        });
        let note:Note = new Note(title, content, tagIds)
        let notes = this._fileManager.GetAllNotes()
        notes.push(note)
        this._fileManager.SaveNotes(notes)
        return note.id;
    }

    IsInDatabase(id:number)
    {
        let notes = this._fileManager.GetAllNotes()
        return notes.some(el => el.id === id)
    }

    DeleteNote(id:number)
    {
        if(this.IsInDatabase(id) == true)
        {
            let notes = this._fileManager.GetAllNotes()
        let notesId = notes.findIndex(el => el.id === id)
        notes.splice(notesId, 1)
        this._fileManager.SaveNotes(notes)
        }
        else
        {
            throw "Invalid id!"
        }
        
    }

    GetNote(id:number)
    {
        if(this.IsInDatabase(id) == true)
        {
            let notes = this._fileManager.GetAllNotes()
            //let notesWithTags: Array<NoteViewModel> = new Array()
            const notesId = notes.findIndex(el => el.id === id);
            let note = notes[notesId]

            let tags: Array<Tag> = new Array()
            note.tags.forEach(element => {
                tags.push(this._tagsService.GetTagById(element))
            });
            let noteWithTags: NoteViewModel = new NoteViewModel(note, tags)
            return noteWithTags
        }
        else
        {
            throw "Invalid id!"
        }
    }
}