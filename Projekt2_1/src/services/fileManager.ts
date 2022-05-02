import {TagsService} from './tagsService'
import {NotesService} from './notesService'
import {Tag} from '../models/tag'
import {Note} from '../models/note'
import { json } from 'stream/consumers'
import fs, { write } from 'fs';
import { User } from '../models/user'


export class FileManager
{
    GetAllTags()
    {
        let rawdata = fs.readFileSync('database/tags.json')
        let tags: Tag[] = JSON.parse(rawdata.toString())
        return tags;
    }
    SaveTags(tags:Tag[])
    {
        fs.writeFileSync('database/tags.json', JSON.stringify(tags))
    }

    GetAllNotes()
    {
        let rawdata = fs.readFileSync('database/notes.json')
        let notes: Note[] = JSON.parse(rawdata.toString())
        return notes;
    }

    SaveNotes(notes:Note[])
    {
        fs.writeFileSync('database/notes.json', JSON.stringify(notes))
    }

    GetAllUsers()
    {
        let rawdata = fs.readFileSync('database/users.json')
        let users: User[] = JSON.parse(rawdata.toString())
        return users;
    }

    SaveUsers(users:User[])
    {
        fs.writeFileSync('database/users.json', JSON.stringify(users))
    }

}
