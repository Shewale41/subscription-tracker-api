import express from 'express';
import {PORT,NODE_ENV,DB_URI} from './config/env.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';

const app = express();

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/subscriptions',subscriptionRouter);

app.get('/',(req,res)=>{
    res.send("hello world");
});

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT} at http://localhost:${PORT}`);
})

export default app;