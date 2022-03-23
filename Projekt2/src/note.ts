import internal from "stream";

export class Note{
    title: string;
    content: string;
    id: number;
    date: Date;
    constructor(title: string, content: string)
    {
        this.title = title;
        this.content = content;
        this.id = Date.now()
        this.date = new Date(Date.now());
        console.log("Note created");
    }
  }