import { FileManager } from "./fileManager"
import {Tag} from '../models/tag'


export class TagsService
{

    private readonly _fileManager:FileManager
    constructor()
    {
        this._fileManager = new FileManager()
    }
    AddTag(tag:Tag): number
    {
        let newTag :Tag = new Tag(tag.tag)

        if(this.CheckIfExists(tag.tag) == false)
        {
            this._fileManager.SaveNewTag(newTag)
        }
        return this.FindTagId(tag.tag)
    }

    private CheckIfExists(tagName: string):boolean {
        let tags = this._fileManager.GetAllTags()
        const elemFound = tags.some(el => el.tag === tagName);
        return elemFound
    }

    private FindTagId(tagName: string)
    {
        let tags = this._fileManager.GetAllTags()
        const TagsElementId = tags.findIndex(el => el.tag === tagName);
        return tags[TagsElementId].id
    }
}

