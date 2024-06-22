import express from 'express';
import mongoose from 'mongoose'

const app = express();
app.use(express.json());

const PORT = process.env.PORT
const mongoDBURL = process.env.MONGODB_URL

app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
})

mongoose
        .connect(mongoDBURL)
        .then(() => {
            console.log('App connected to database');
        })
        .catch((error) => {
            console.log(error);
        });