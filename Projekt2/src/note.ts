import { Tag } from "./tag";

export class Note{
    title: string;
    content: string;
    id: number;
    date: Date;
    //tags: Array<Tag> = new Array();
    constructor(title: string, content: string)
    {
        this.title = title;
        this.content = content;
        this.id = Date.now()
        this.date = new Date(Date.now());
        // tags.forEach(element => {
        //     console.log(element)
        // });
        console.log("Note created");
    }
  }