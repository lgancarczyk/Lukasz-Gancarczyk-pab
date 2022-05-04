import { Request, Response } from 'express';
import { send } from 'process';
import {UserService} from '../services/userService'
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require("cookie-parser")

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

        res.status(200).send(token)
    }
    catch(error)
    {
        res.status(400).send(error);
    }

})
router.delete('/delete', async (req: Request, res: Response) => {

    try{
        const token = req.header('x-auth-token')
        if(!token){
            throw "Authorization error!"
        }
        let deletedUser = await _userService.DeleteUser(token)
        res.status(200).send(`Deleted User Id: ${deletedUser.id}`)
    }
    catch(error)
    {
        res.status(500).send(error);
    }

})


module.exports = router;