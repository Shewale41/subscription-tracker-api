import {Router} from "express";
import { getUser, getUsers } from "../controller/user.controller.js";

const userRouter = Router();

userRouter.get('/',getUsers )

userRouter.get('/:id', getUser )

userRouter.post('/',(req,res)=>{res.send({title:"ADD a new user "})})

userRouter.put('/:id',(req,res)=>{res.send({title:"UPDATE the user"})})

userRouter.delete('/:id',(req,res)=>{res.send({title:"DELETE the user"})})

export default userRouter;