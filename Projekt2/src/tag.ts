import internal from "stream";

export class Tag{
    name: string;
    id: number;
    constructor(name: string)
    {
        this.name = name;
        this.id = Date.now()
        console.log("Tag created");
    }
  }