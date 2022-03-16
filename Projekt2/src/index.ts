//jeśli instaluje u siebie na omputerz, zainstaluj nodemon i ts-node globalnie (-g)
import express from 'express'
import {Request, Response} from 'express'
import { json } from 'stream/consumers'

const app = express()
//const notes = []

app.use(express.json())

app.get('/', function (req: Request, res: Response) {
  let note = {title:"test",content:"test_content"}
  res.send(note)
})
app.post('/', function (req: Request, res: Response) {
  console.log(req.body) // e.x. req.body.title 

  let title: string = req.body.title;
  let content: string = req.body.content;
  let note = {title:title,content:content}
  res.send(note)

  //res.status(200).send('POST Hello World')
})

app.listen(3000)