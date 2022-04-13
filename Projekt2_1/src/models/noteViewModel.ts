import {Tag} from './tag'
import {Note} from './note'

export class NoteViewModel
{
    id: number;
    title: string;
    content: string;
    date: Date;
    tags: Array<Tag> = new Array();

    constructor(note:Note, tags: Array<Tag>)
    {
        this.id=note.id
        this.title = note.title
        this.content = note.content
        this.date = note.date
        this.tags = tags
    }
}