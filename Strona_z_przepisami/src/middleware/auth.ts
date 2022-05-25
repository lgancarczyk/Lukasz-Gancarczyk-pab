import { Request, Response, NextFunction } from 'express';
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

var settings = require('../settings.json');

const auth = (req:Request, res:Response, next:NextFunction) => {
    const token = req.cookies.accesstoken;
    
    if (!token) {
        res.status(400).send("First Log In!")
        }
    try {
      const data = jwt.verify(token, settings.secretkey);
      req.headers.userId = data.id;
      req.headers.username = data.username;
      return next();
    } catch(error) {
      throw error
    }
   };

  module.exports = auth;
