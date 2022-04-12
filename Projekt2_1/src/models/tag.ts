export class Tag
{
    id: number;
    tag: string;

    constructor(tag: string ="")
    {
        this.id = Date.now()
        this.tag = tag.toLowerCase();
    }
}

//export default Tag;