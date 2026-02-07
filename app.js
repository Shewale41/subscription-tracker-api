import express from 'express';
import {PORT,NODE_ENV,DB_URI} from './config/env.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectDB from './database/mongodb.js';
import errorMiddleware from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middleware/arcjet.middleware.js';
import workflowRouter from './routes/workflow.routes.js';

const app = express();

//these are the 
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/subscriptions',subscriptionRouter);
app.use('/api/v1/workflows',workflowRouter);

//apna written middleware
app.use(errorMiddleware);

app.get('/',(req,res)=>{
    res.send("hello world");
});

app.listen(PORT,async()=>{
    console.log(`server is running on port ${PORT} at http://localhost:${PORT}`);
    await connectDB();
    console.log(`connected to mongodb successfully in ${NODE_ENV} mode `);
})

export default app;