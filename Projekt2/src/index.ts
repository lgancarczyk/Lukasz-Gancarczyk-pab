//jeśli instaluje u siebie na omputerz, zainstaluj nodemon i ts-node globalnie (-g)
import express from 'express'
import {Request, Response} from 'express'
import { json } from 'stream/consumers'
import {Note} from './note'
import {Tag} from './tag'

const app = express()

const notes: Array<Note> = new Array();

app.use(express.json())

app.get('/notes', function (req: Request, res: Response) {
  res.status(200).send(notes)

})

app.get('/note/:id', function (req: Request, res: Response) {
  let id  = req.params.id;
  let note = notes.filter(x =>x.id == +id)
  if(notes.findIndex(x =>x.id == +id) == -1)
  {
    res.status(404).send("Note doesn`t exist!")
  }
  else
  {
    res.status(200).send(note);
  }
})

app.put('/note/:id', function (req: Request, res: Response) {
  let id  = req.params.id;
  let note = notes.filter(x =>x.id == +id)
  if(notes.findIndex(x =>x.id == +id) == -1)
  {
    res.status(404).send("Note doesn`t exist!")
  }
  else
  {
    if(req.body.title){
      notes[notes.findIndex(x =>x.id == +id)].title = req.body.title
    }
    if(req.body.content){
      notes[notes.findIndex(x =>x.id == +id)].content = req.body.content
    }
    res.status(204).send("Note updated.")
  }
})

app.delete('/note/:id', function (req: Request, res: Response) {
  let id  = req.params.id;
  
  if(notes.findIndex(x =>x.id == +id) == -1)
  {
    res.status(404).send("Wrong Id!")
  }
  else
  {
    notes.splice(notes.findIndex(x =>x.id == +id), 1)
    res.status(204).send("Note deleted.")
  }
})

app.post('/note', function (req: Request, res: Response) {
  
  if(req.body.title === "" || req.body.content === "")
  {
    res.status(400).send("Title and Content can not be empty!")
  }
  else if(!req.body.title || !req.body.content)
  {
    res.status(400).send("Wrong arguments!")
  }
  else
  {
    console.log(req.body) 

    let tagsFromPost: Array<Tag> = new Array();
    tagsFromPost = req.body.tags
    let tagIdsToNote:Number[]
    tagsFromPost.forEach(element => {
      let tag = new Tag(element.name)
      //AddTag zwraca nam id podanego taga
      tagIdsToNote.push(tag.AddTag(tag))
    });
    
    let note: Note = new Note(req.body.title, req.body.content);
    notes.push(note);
    res.status(201).send(note.id.toString());
  }
  
})



app.listen(3000)



