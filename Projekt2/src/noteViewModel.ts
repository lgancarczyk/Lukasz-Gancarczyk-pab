import { Tag } from "./tag";
import fs, { write } from 'fs';
import {Note} from './note'


export class NoteViewModel{
    title: string;
    content: string;
    id: number;
    date: Date;
    tags: Array<string> = new Array();
    constructor(note:Note)
    {
        this.title = note.title;
        this.content = note.content;
        this.id = note.id
        this.date = note.date;
        this.tags = this.ParseTagIdToString(note.tags);
        console.log("Note created");
    }
    private ParseTagIdToString(TagsId: Array<number>)
    {
        let tags: Array<string> = new Array()
        TagsId.forEach(element => {
            let tag: Tag = new Tag("", element)
            
            tags.push(tag.findTagName(element))
        });
        return tags
    }
}