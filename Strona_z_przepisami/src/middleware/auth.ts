// const jwt = require('jsonwebtoken')

// const auth = (req: Request, res: Response next) =>{

//     try{
//         const token = req.headers("x-auth-token")
//         if(!token){
//             res.status(400).send("Authorization error!")
//         }
//         const verified = jwt.verify(token, process.env.JWT_SECRET)
//         if(!verified){
//             res.status(401).send("Authorization denied!")
//         }
//         req.headers.user = verified.id
//         next()
//     }
//     catch(error){
//         res.status(500).send(error)
//     }
// }

// module.exports = auth