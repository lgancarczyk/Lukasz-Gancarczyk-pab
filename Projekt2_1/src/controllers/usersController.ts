import { Request, Response } from 'express';
import Note from '../models/note';
import { TagsService } from '../services/tagsService';
import { NotesService } from '../services/notesService';
import { UsersService } from '../services/usersService';

const express = require('express');
const router = express.Router();
const app = express()
app.use(express.json())

const _usersService: UsersService = new UsersService()


router.get('/testget', (req: Request, res: Response) => {

    res.status(200).send("success");
})

router.post('/login', (req: Request, res: Response) => {

    res.status(200).send("login");
})    

router.post('/register', (req: Request, res: Response) => {

    //_usersService.register(req.body.login, req.body.password)
}) 





module.exports = router;