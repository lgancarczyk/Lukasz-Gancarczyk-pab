import fs, { write } from 'fs';



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
    private IsPasswordCorrect(user:User)
    {
        let users = this.ReadAllFileToJSON()
        const UsersId:number = this.FindUserId(user.login)
        if(users[UsersId].password == user.password)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    private GenerateToken(user:User)
    {
        return "token"
    }
    public LoginUser(user:User)
    {
        if(this.IsPasswordCorrect(user))
        {
            return this.GenerateToken(user)
        }
        else
        {
            throw "Invalid Login or Password!"
        }
    }

}