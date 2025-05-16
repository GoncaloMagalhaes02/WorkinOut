import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";



export const createUser = async (req, res) => {
    const { name, email, password, photo } = req.body;
    
    try {
        // Check if user already exists
        const existingUser = await UserModel.findOne({ where: { email } });
        if (existingUser) {
        return res.status(400).json({ message: "Utilizador já existe" });
        }

    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create a new user
        const newUser = new UserModel({
        name,
        email,
        password: hashedPassword,
        photo: req.file ? `/uploads/${req.file.filename}` : "/uploads/default.png",
        });
    
        // Save the user to the database
        await newUser.save();
    
        // Generate a token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
        });
        res.status(201).json({ user: newUser });
        res.status(201).json({ message: "Utilizador criado com sucesso" }); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


