import jwt from "jsonwebtoken";
import { Request, Response } from "express";


export class User {
  public login: string;
  public password: string;
  public id: number;
  public noteId?: number[];

  constructor(login:string, password:string) {
    this.id = Date.now();
    this.login = login;
    this.password = password;
    //this.noteId = User.noteId;
  }
}