const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  
  const userRole = role === 'admin' ? 'admin' : 'cliente';

  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role: userRole });
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Error al registrar usuario 👤❌' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado 🔎❌' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: 'Contraseña incorrecta 🔒❌' });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, role: user.role, userId: user._id });
  } catch (err) {
    res.status(500).json({ error: 'Error al iniciar sesión 😖❌' });
  }
};

module.exports = { register, login };

