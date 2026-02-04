import {Router} from "express";

const subscriptionRouter = Router();

subscriptionRouter.get('/',(req,res)=>{res.send({title:"GET all subscriptions"})})

subscriptionRouter.get('/:id',(req,res)=>{res.send({title:"GET a subscription"})})

subscriptionRouter.post('/',(req,res)=>{res.send({title:"ADD a new subscriptions"})})

subscriptionRouter.put('/:id',(req,res)=>{res.send({title:"UPDATE a subscriptions"})})

subscriptionRouter.delete('/',(req,res)=>{res.send({title:"DELETE a subscriptions"})})

subscriptionRouter.get('/user/:id',(req,res)=>{res.send({title:"GET all user subscriptions"})})

subscriptionRouter.put('/:id/cancel',(req,res)=>{res.send({title:"CANCEL a subscriptions"})})

subscriptionRouter.get('/upcoming-renewals',(req,res)=>{res.send({title:"upcoming renewal subscriptions"})})


export default subscriptionRouter;