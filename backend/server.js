import express from 'express'
import dotenv from 'dotenv'

import authRoutes from './Routes/auth.routes.js'
import messsageRoutes from './Routes/message.routes.js'
import userRoutes from './Routes/user.routes.js'
import { connectToMongo } from './db/connectToMongo.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const PORT=process.env.PORT || 5000;
const app= express();



app.use(express.json());
app.use(cookieParser());

app.use("/api/messages",messsageRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);

app.listen(PORT,()=>{
    connectToMongo();
    console.log(`Server started at port ${PORT}`)
});