import { TagsService } from './tagsService';
import { FileManager } from "./fileManager"
import {Tag} from '../models/tag'
import Note from '../models/note';




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
        this._fileManager.SaveNewNote(note)
        return note.id;
    }
}