import { Request, Response } from 'express';
import { send } from 'process';
import {UserService} from '../services/userService'
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../dbSchemas/userSchema')
const auth = require("../middleware/auth")


const express = require('express');
const router = express.Router();
const app = express()
app.use(express.json())

const _userService = new UserService();

router.post('/register', async (req: Request, res: Response) => {

    try
    {
        const {username, password} = req.body;
        if(!username || !password){
            throw "Not all fields are included"
        }
        if(password.legth < 5){
            throw "Password must be at least 5 characters long!"
        }
        const existingUsername = await User.findOne({username:username})
        if(existingUsername){
            throw "Username already exists!"
        }
        let newUser = await _userService.AddUser(username, password)

        res.status(200).send(newUser.id)
    }
    catch(error)
    {
        res.status(400).send(error);
    }
})

router.post('/login', async (req: Request, res: Response) => {

    try
    {
        const {username, password} = req.body;
        if(!username || !password){
            throw "Not all fields are included"
        }
        
        let token = await _userService.LoginUser(username, password)
        res.cookie('accesstoken', token)
        res.status(200).send(token)

        // console.log(_userService.LoggedIn())
        //
        //res.status(200).send(token)
    }
    catch(error)
    {
        res.status(400).send(error);
    }

})
router.get('/logout', auth, async (req:Request, res:Response) => {
    res
      .clearCookie("accesstoken")
      .status(200)
      .send("Logged out!")  
    });

router.get('/testget', auth, async (req:Request, res:Response) => {
    let x = req.headers.userId
    let y = req.headers.username
    res.status(200).send(`${x} ${y}`)
    });

router.get('/protected', async (req:Request, res:Response) => {
    let x = req.cookies
    res.status(200).send(x)
    })

router.delete('/delete',auth, async (req: Request, res: Response) => {

    try{
        let x = req.headers.userId
        let deletedUser = await _userService.DeleteUser(x)
        res.clearCookie("accesstoken").status(200).send(`Deleted User Id: ${deletedUser.id}`)
    }
    catch(error)
    {
        res.status(500).send(error);
    }

})


module.exports = router;