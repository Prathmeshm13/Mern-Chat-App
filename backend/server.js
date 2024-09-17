import express from 'express';
import dotenv from 'dotenv';
import path from "path";
import cors from 'cors';
import authRoutes from './Routes/auth.routes.js';
import messsageRoutes from './Routes/message.routes.js';
import userRoutes from './Routes/user.routes.js';
import { connectToMongo } from './db/connectToMongo.js';
import cookieParser from 'cookie-parser';
import {app, server} from './socket/socket.js';

dotenv.config();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
      origin: "https://mern-chat-app-g3nc.onrender.com", // Your frontend URL
      credentials: true, // Allow credentials (cookies) to be sent
    })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/messages", messsageRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
  connectToMongo();
  console.log(`Server started at port ${PORT}`);
});
