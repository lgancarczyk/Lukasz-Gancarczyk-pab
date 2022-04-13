import { Request, Response } from 'express';
import Note from '../models/note';
import { TagsService } from '../services/tagsService';
import { NotesService } from '../services/notesService';

const express = require('express');
const router = express.Router();
const app = express()
app.use(express.json())
 
const _notesService: NotesService = new NotesService()

router.get('/testget', (req: Request, res: Response) => {

res.status(200).send("success");
})

router.post('/note', (req: Request, res: Response) => {

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
    let noteId = _notesService.AddNote(req.body.title, req.body.content, req.body.tags)

    res.status(200).send(`Note Creted Id: ${noteId}`)
  }


})

router.get('/note/:id', (req: Request, res: Response) => {
  try
  {
    let note = _notesService.GetNote(+req.params.id)
    res.status(200).send(note);


  }
  catch(error)
  {
    res.status(404).send(error)
  }

})
router.delete('/delete/:id', (req: Request, res: Response) => {
  try
  {
    _notesService.DeleteNote(+req.params.id)
    res.status(200).send("Note deleted!");

  }
  catch(error)
  {
    res.status(404).send(error)
  }

})




module.exports = router;