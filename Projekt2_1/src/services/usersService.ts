import { TagsService } from './tagsService';
import { FileManager } from "./fileManager"
import {Tag} from '../models/tag'
import Note from '../models/note';
import { User } from '../models/user';
import { NoteViewModel } from '../models/noteViewModel';
import jwt from 'jsonwebtoken';



export class UsersService
{
    private readonly _fileManager:FileManager
    constructor()
    {
        this._fileManager = new FileManager()
    }

    Login(login:string, password:string)
    {
        
    }
}