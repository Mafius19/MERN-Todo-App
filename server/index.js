import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import todosRoutes from './routes/todos.js'

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000
// app.listen(PORT)

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/todos', todosRoutes)
const mongodb = "mongodb+srv://matibyte:matibyte@nodetuts.clihy.mongodb.net/todos-database?retryWrites=true&w=majority"

app.get('/', (req, res) => {
    res.send('Welcome to server')
})

mongoose.connect(mongodb, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => app.listen(PORT, () => console.log(`server is running on port ${PORT}`))) 
    .catch(err => console.log(err))