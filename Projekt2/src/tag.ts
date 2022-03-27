import internal from "stream";
import fs from 'fs';
import { json } from "stream/consumers";


export class Tag{
    name: string;
    id: number;
    constructor(name: string)
    {
        this.name = name;
        this.id = Date.now()
        //console.log(`Tag "${name}" has been created.`);
    }

    public CheckIfExists(tagName: string):boolean {
        return false
        
    }

    async readStorage(): Promise<any> {
        try {
            const data = await fs.promises.readFile('Tags.json', 'utf-8');
            return JSON.parse(data);
        } catch (err) {
            console.log(err)
        }
      }

    async updateStorage(dataToSave: Tag): Promise<void> {
    try {
        await fs.promises.writeFile('Tags.json', JSON.stringify(this.readStorage().then) + JSON.stringify(dataToSave));
    } catch (err) {
        console.log(err)
    }
    }
      
  }