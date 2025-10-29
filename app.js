import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 3000;
const URI=`mongodb+srv://MuhammadRayyanAsrar:RaYYaN8008@todoapp.kzq80qh.mongodb.net/?retryWrites=true&w=majority&appName=TodoApp`


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(URI).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log("Error connecting to MongoDB",err);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

