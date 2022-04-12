import {TagsService} from './tagsService'
import {NotesService} from './notesService'
import {Tag} from '../models/tag'
import {Note} from '../models/note'
import { json } from 'stream/consumers'
import fs, { write } from 'fs';


export class FileManager
{
    GetAllTags()
    {
        let rawdata = fs.readFileSync('database/tags.json')
        let tags: Tag[] = JSON.parse(rawdata.toString())
        return tags;
    }
    SaveNewTag(tag:Tag)
    {
        let tags = this.GetAllTags()
            tags.push(tag)
            fs.writeFileSync('database/tags.json', JSON.stringify(tags))
    }

    GetAllNotes()
    {
        let rawdata = fs.readFileSync('database/notes.json')
        let notes: Note[] = JSON.parse(rawdata.toString())
        return notes;
    }

    SaveNewNote(note:Note)
    {
        let tags = this.GetAllNotes()
            tags.push(note)
            fs.writeFileSync('database/notes.json', JSON.stringify(tags))
    }

}
