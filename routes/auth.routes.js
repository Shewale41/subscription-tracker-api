import {Router} from "express";

const authRouter = Router();

authRouter.post('/sign-in',(req,res)=>{
    res.send({title:"sign-in page"})
})

authRouter.post('/sign-up',(req,res)=>{
    res.send({title:"sign-up page"})
})

authRouter.post('/sign-out',(req,res)=>{
    res.send({title:"sign-out page"})
})

export default authRouter;