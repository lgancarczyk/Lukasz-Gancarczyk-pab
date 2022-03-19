//jeśli instaluje u siebie na omputerz, zainstaluj nodemon i ts-node globalnie (-g)
import express from 'express'
import {Request, Response} from 'express'
import { json } from 'stream/consumers'
import {Note} from './note'

const app = express()

const notes: Array<Note> = new Array();

app.use(express.json())

app.get('/getall', function (req: Request, res: Response) {
  res.send(notes)
})
app.get('/note/:id', function (req: Request, res: Response) {
  let id  = req.params.id;
  res.send(notes.filter(x =>x.id == +id))
})
app.delete('/note/:id', function (req: Request, res: Response) {
  let id  = req.params.id;
  notes.splice(notes.findIndex(x =>x.id == +id), 1)
  
  res.send("Note deleted")
})
app.post('/note', function (req: Request, res: Response) {
  console.log(req.body) 

  let note: Note = new Note(req.body.title, req.body.content);
  notes.push(note);
  res.send(note)
})

app.listen(3000)



