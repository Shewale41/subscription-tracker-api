import {Router} from "express";
import authorize from "../middleware/auth.middleware.js";
import { createSubscription, getSubscriptions } from "../controller/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/',(req,res)=>{res.send({title:"GET all subscriptions"})})

subscriptionRouter.get('/:id',(req,res)=>{res.send({title:"GET a subscription"})})

subscriptionRouter.post('/',authorize,createSubscription )

subscriptionRouter.put('/:id',(req,res)=>{res.send({title:"UPDATE a subscriptions"})})

subscriptionRouter.delete('/',(req,res)=>{res.send({title:"DELETE a subscriptions"})})

subscriptionRouter.get('/user/:id',authorize, getSubscriptions )

subscriptionRouter.put('/:id/cancel',(req,res)=>{res.send({title:"CANCEL a subscriptions"})})

subscriptionRouter.get('/upcoming-renewals',(req,res)=>{res.send({title:"upcoming renewal subscriptions"})})


export default subscriptionRouter;