import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

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
      photo: req.file ? `/uploads/${req.file.filename}` : "/default.png",
    });

    // Save the user to the database
    await newUser.save();

    // Generate a token
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({
      message: "Utilizador criado com sucesso",
      user: newUser,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Utilizador não encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Senha incorreta" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const insertData = async (req, res) => {
  const { height, weight, age } = req.body;
  const userId = req.params.user_id;

  // Validate input
  if (!height || !weight || !age) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios" });
  }

  if (
    typeof height !== "number" ||
    typeof weight !== "number" ||
    typeof age !== "number"
  ) {
    return res
      .status(400)
      .json({ message: "Altura, peso e idade devem ser números" });
  }

  if (height <= 0 || weight <= 0 || age <= 0) {
    return res
      .status(400)
      .json({ message: "Altura, peso e idade devem ser maiores que zero" });
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
};

export const getData = async (req, res) => {
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
};

export const listaUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const getUserProfile = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "Utilizador não encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error("Erro ao buscar utilizador:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const atualizarDados = async (req, res) => {
  const userId = req.user.id;
  const { name, age, weight, height } = req.body;

  try {
    const user = await UserModel.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Atualiza apenas se os campos forem fornecidos
    user.name = name ?? user.name;
    user.age = age ?? user.age;
    user.weight = weight ?? user.weight;
    user.height = height ?? user.height;

    await user.save();

    const { password, ...userWithoutPassword } = user.toJSON();
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

