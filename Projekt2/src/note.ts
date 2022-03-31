import { Tag } from "./tag";
import fs, { write } from 'fs';
import { NoteViewModel } from "./noteViewModel";

export class Note{
    title: string;
    content: string;
    id: number;
    date: Date;
    tags: Array<number> = new Array();
    constructor(title: string = " ", content: string = "", tags:Array<number> = [])
    {
        this.title = title;
        this.content = content;
        this.id = Date.now()
        this.date = new Date(Date.now());
        this.tags = tags
        console.log("Note created");
    }

    public AddNote(note: Note)
    {
        console.log("xx")
        let notes = this.ReadAllFileToJSON()
        notes.push(note)
        fs.writeFileSync('Notes.json', JSON.stringify(notes))
    }
    public GetAllNote()
    {
        let rawdata = fs.readFileSync('Notes.json')
        let notes: Note[] = JSON.parse(rawdata.toString())
        //let notesWithTags: NoteViewModel[]
        let notesWithTags: Array<NoteViewModel> = new Array()
        notes.forEach(element => {
            let noteModel:NoteViewModel = new NoteViewModel(element)
            notesWithTags.push(noteModel)
        });
        return notesWithTags;
    }

    public ReadAllFileToJSON()
    {
        let rawdata = fs.readFileSync('Notes.json')
        let notes: Note[] = JSON.parse(rawdata.toString())
        return notes;
    }
  }