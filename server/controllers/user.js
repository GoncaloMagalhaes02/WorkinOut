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
        photo: req.file ? `/uploads/${req.file.filename}` : "/uploads/defaultuser.png",
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

export const loginUser = async (req, res) => {
    const { name, password } = req.body;
    
    try {
        // Check if user exists
        const user = await UserModel.findOne({ where: { name } });
        if (!user) {
            return res.status(400).json({ message: "Utilizador não encontrado" });
        }
    
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Senha incorreta" });
        }
    
        // Generate a token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
    
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const insertData = async (req, res) => {


    const {height, weight, age} = req.body;
    const userId = req.params.user_id;

    // Validate input
    if (!height || !weight || !age) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    if (typeof height !== 'number' || typeof weight !== 'number' || typeof age !== 'number') {
        return res.status(400).json({ message: "Altura, peso e idade devem ser números" });
    }

    if (height <= 0 || weight <= 0 || age <= 0) {
        return res.status(400).json({ message: "Altura, peso e idade devem ser maiores que zero" });
    }



    try {
        // Check if user exists
        const user = await UserModel.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "Utilizador não encontrado" });
        }

        // Update user data
        user.height = height;
        user.weight = weight;
        user.age = age;

        // Save the updated user
        await user.save();

        res.status(200).json({ message: "Dados atualizados com sucesso", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const getUserData = async (req, res) => {
    const userId = req.params.user_id;

    // if user exists
    if (!userId) {
        return res.status(400).json({ message: "ID do utilizador é obrigatório" });
    }

    try {
        // Check if user exists
        const user = await UserModel.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "Utilizador não encontrado" });
        }

        // Return user data
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getUserById = async (req, res) => {
    const userId = req.params.userId;

    //check if user exists
    if (isNaN(userId)) {
        return res.status(400).json({ message: "ID do utilizador inválido" });
    }

    try {
        // Check if user exists
        const user = await UserModel.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "Utilizador não encontrado" });
        }

        // Return user data
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


