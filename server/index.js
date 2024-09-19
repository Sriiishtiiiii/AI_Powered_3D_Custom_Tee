import express from 'express';
import * as dotenv from 'dotenv';
import dalleRoutes from './routes/dalle.routes.js'; 
import cors from 'cors';

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/dalle',dalleRoutes);

app.listen(8080,()=>{
  console.log("Server has started on port 8080");
})