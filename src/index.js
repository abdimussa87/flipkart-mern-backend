import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import adminAuthRoutes from './routes/admin/adminAuthRoutes.js'

// *Useful for getting environment vairables
dotenv.config();

const app = express();

// *middlewares

app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', adminAuthRoutes)

// *Database connection
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(value => console.log('Connected to db'));


app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})