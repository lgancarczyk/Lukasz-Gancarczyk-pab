import internal from "stream";

export class Note{
    title: string;
    content: string;
    id: number;
    constructor(title: string, content: string)
    {
        this.title = title;
        this.content = content;
        this.id = Date.now()
        console.log("Note created");
    }
  }