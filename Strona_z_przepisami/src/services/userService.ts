import { Console } from "console"

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require("cookie-parser")


const User = require('../dbSchemas/userSchema')
const auth = require("../middleware/auth")
//const secret:string = "xxx"

var setting = require('../settings.json')


export class UserService {
    async AddUser(username: string, password: string) {
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            username: username,
            password: passwordHash
        })
        const savedUser = await newUser.save()
        return savedUser
    }

    async LoginUser(username: string, password: string) {
        try {
            const user = await User.findOne({ username: username })
            if (!user) {
                throw "User does not exists!"
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                throw "Invalid password"
            }

            const payload = {
                id: user._id,
                username: user.username
            }

            const signInOptions = {
                expiresIn: '1h'
            }

            const token = jwt.sign(payload, setting.secretkey, signInOptions)

            return token
        }
        catch (error) {
            throw error
        }
    }

    async DeleteUser(userId:any) {
        
        try{
            const deletedUser = await User.findByIdAndDelete(userId)
            return deletedUser
        }
        catch(error){
            throw error
        }
    }

    async LoggedIn(){
        
        try {
            let token = cookieParser.cookies.accesstoken;
            if(!token){
                throw "Please Log In"
            }
            let verified = jwt.verify(token, setting.secretkey)
            if (!verified) {
                throw "Authorization denied!"
            }
            console.log(verified.id)
            return verified
        } catch {
        throw "Please Log In"
        }

    }
}

