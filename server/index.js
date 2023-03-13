import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import user from './routes/router.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 4000
const urlAPI = process.env.MONGO_DB

app.use(cors())
app.use(express.json({ limit: '30mb' }))
app.use('/user', user)

// mongoose.connect(urlAPI).then(()=>{
//     console.log('success to connect mongodb');
//     app.listen(port, ()=>{
//         console.log(`connected to Backend, port - ${port}`);
//     })
// }).catch((error)=>{
//     console.log(error);
// })

const connect = async () => {
    try {
        await mongoose.connect(urlAPI);
        console.log("Connected to mongoDB.");
    } catch (error) {
        console.log(error);
    }
};

app.use((err, res) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
    });
});

app.listen(port, () => {
    connect();
    console.log(`connected to Backend, port - ${port}`);
});