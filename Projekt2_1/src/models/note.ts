
export class Note
{
    id: number;
    title: string;
    content: string;
    date: Date;
    tags: Array<number> = new Array();

    constructor(title: string = " ", content: string = "", tags:Array<number> = [])
    {
        this.title = title;
        this.content = content;
        this.id = Date.now();
        this.date = new Date(Date.now());
        this.tags = tags
        
    }
}
export default Note;