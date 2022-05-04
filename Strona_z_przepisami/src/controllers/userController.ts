import { Request, Response } from 'express';
import { send } from 'process';
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require("cookie-parser")

const User = require('../dbSchemas/userSchema')
const auth = require("../middleware/auth")


const express = require('express');
const router = express.Router();
const app = express()
app.use(express.json())

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

        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            username: username,
            password: passwordHash
        })
        const savedUser = await newUser.save()

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
        
        const user = await User.findOne({username:username})
        if(!user){
            throw "User does not exists!"
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            throw "Invalid password"
        }

        const payload = {
            id: user._id,
            username: user.username
        }

        const signInOptions= {
            expiresIn: '1h'
        }

        const token = jwt.sign(payload, "xxx", signInOptions)

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
        const verified = jwt.verify(token, "xxx")
        if(!verified){
            throw "Authorization denied!"
        }
        
        const deletedUser = await User.findByIdAndDelete(verified.id)
        res.status(200).send(`Deleted User Id: ${deletedUser.id}`)
    }
    catch(error)
    {
        res.status(500).send(error);
    }

})


module.exports = router;