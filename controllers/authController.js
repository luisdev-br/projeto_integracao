const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Verificar se o usuário já existe
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "Usuário já existe!" });
  }

  // Criptografar a senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Criar o usuário
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "Usuário criado com sucesso!", user });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // Verificar se o usuário existe
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Usuário não encontrado!" });
  }

  // Verificar a senha
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Senha inválida!" });
  }

  // Gerar token JWT
  const token = jwt.sign({ id: user._id }, "secreto", { expiresIn: "1h" });

  res.json({ message: "Login realizado com sucesso!", token });
};

module.exports = { register, login };