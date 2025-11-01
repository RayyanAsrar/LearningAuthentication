import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import User from './models/userSchema.js';
import bcrypt from 'bcryptjs';
const app = express();
const PORT = process.env.PORT || 3000;
const URI = `mongodb+srv://MuhammadRayyanAsrar:RaYYaN8008@todoapp.kzq80qh.mongodb.net/?retryWrites=true&w=majority&appName=TodoApp`

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});

app.post('/signup', async (req, res) => {
    try {
        const body = req.body;
        const password = body.password;
        const bcryptedPassword = await bcrypt.hash(password, 10);
        const updatedBody = {
            ...body,
            password: bcryptedPassword
        }
        // console.log(bcryptedPassword);

        const userRespone = await User.create(updatedBody);
        res.json({ status: true, data: userRespone, message: "User created successfully" });
        // console.log(firstName,lastName,gender);
    } catch (error) {
        res.json({ status: false, error: error.message || "Internal Server Error" });
    }
})


app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        // console.log(user);
        const comparePassword = await bcrypt.compare(password, user.password);
        // console.log("comparePassword",comparePassword);
        if (comparePassword) {
            return res.json({ status: true, data: user, message: "Login successful" });
        }   else {
            return res.json({ status: false, message: "Invalid credentials" });
        }   
        
    
        



        if (!user) {
            return res.json({ status: false, message: "User not found" });
        }
    }
    catch (error) {
        res.json({ status: false, error: error.message || "Internal Server Error" });
    }
})



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

