import fs, { write } from 'fs';
import jwt from 'jsonwebtoken';



export class User{

    id: number;
    login: string;
    password: string;

    public constructor(login: string, password: string)
    {
        this.login = login,
        this.password = password,
        this.id = Date.now()
    }

    public CheckIfExists(login: string):boolean {
        let users = this.ReadAllFileToJSON()
        const elemFound = users.some(el => el.login === login);
        return elemFound
    }

    public AddNewUser(user:User)
    {
        if(this.CheckIfExists(user.login) == false)
        {
            let users = this.ReadAllFileToJSON()
            users.push(user)
            fs.writeFileSync('Users.json', JSON.stringify(users))
            console.log("User was created")
        }
        return this.FindUserId(user.login)
    }

    // private IsPasswordCorrect(user:User)
    // {
    //     let users = this.ReadAllFileToJSON()
    //     const UsersId:number = this.FindUserId(user.login.toString())
    //     if(users[UsersId].password == user.password)
    //     {
    //         return true;
    //     }
    //     else
    //     {
    //         return false;
    //     }
    // }

    public FindUserId(login: string)
    {
        let users = this.ReadAllFileToJSON()
        const UsersElementId = users.findIndex(el => el.login === login);
        return users[UsersElementId].id
    }

    private ReadAllFileToJSON()
    {
        let rawdata = fs.readFileSync('Users.json')
        let users: User[] = JSON.parse(rawdata.toString())
        return users;
    }
    private GenerateToken(user:User)
    {
        const token = jwt.sign(
                {"id": this.FindUserId(user.login),
                "login": user.login},
                 user.password)
            return token;
    }
    
    
    public LoginUser(user:User)
    {
        let users = this.ReadAllFileToJSON()
        const UsersId = users.findIndex(el => el.login === user.login);
        if(users[UsersId].login == user.login &&  users[UsersId].password == user.password)
        {
                // const token = jwt.sign(
                // {"id": this.FindUserId(user.login),
                // "login": user.login},
                //  this.secret)
            //return token;
            return this.GenerateToken(user)
        }
        else
        {
            throw "Invalid Login or Password!"
        }
    }

}