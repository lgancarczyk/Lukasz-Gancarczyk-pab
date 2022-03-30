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
        tags.forEach(element => {
            if(element.name==tagName)
            {
                console.log("istnieje")
                return true
            }
        });
        return false
    }

    public AddNewTag(tag:Tag)
    {
        if(this.CheckIfExists(tag.name) == false)
        {
            
            let tags = this.ReadAllFileToJSON()
            tags.push(tag)
            fs.writeFileSync('Tags.json', JSON.stringify(tags))
        }
        
    }
    private ReadAllFileToJSON()
    {
        let rawdata = fs.readFileSync('Tags.json')
        let tags: Tag[] = JSON.parse(rawdata.toString())
        return tags;
        
    }
    


  }