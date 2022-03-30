import internal from "stream";
import fs, { write } from 'fs';
import { json } from "stream/consumers";
import { runInThisContext } from "vm";

export class Tag{
    id: number;
    name: string;
    
    
    constructor(name: string)
    {
        this.name = name;
        this.id = Date.now()
    }

    private CheckIfExists(tagName: string):boolean {
        let tags = this.ReadAllFileToJSON()
        const elemFound = tags.some(el => el.name === tagName);
        return elemFound
    }

    public AddTag(tag:Tag):number
    {
        if(this.CheckIfExists(tag.name) == false)
        {
            let tags = this.ReadAllFileToJSON()
            tags.push(tag)
            fs.writeFileSync('Tags.json', JSON.stringify(tags))
        }
        return this.FindTagId(tag.name)
        
    }

    private FindTagId(tagName: string)
    {
        let tags = this.ReadAllFileToJSON()
        const TagsElementId = tags.findIndex(el => el.name === tagName);
        return tags[TagsElementId].id
    }
    private ReadAllFileToJSON()
    {
        let rawdata = fs.readFileSync('Tags.json')
        let tags: Tag[] = JSON.parse(rawdata.toString())
        return tags;
    }
    


  }