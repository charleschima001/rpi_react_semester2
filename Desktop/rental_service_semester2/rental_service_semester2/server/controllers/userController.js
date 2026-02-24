import bcrypt from 'bcrypt';
import ApiError from '../error/ApiError.js';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';

export const registration = async (req, res, next) => {
  try {
    const { email, password, userType, username } = req.body;

    if (!email || !password) {
      return next(ApiError.badRequest('Некорректный email или password'));
    }

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким email уже существует'));
    }

    let avatarImage = null;
    if (req.file) {
      avatarImage = `/static/${req.file.filename}`;
    }

    const hashPassword = await bcrypt.hash(password, 5);

    const user = await User.create({
      email,
      userType: userType || 'normal',
      username: username || email.split('@')[0],
      avatar: avatarImage,
      password: hashPassword
    });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatarUrl: user.avatar,
        isPro: user.userType === 'pro'
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    next(ApiError.internal('Ошибка регистрации'));
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(ApiError.badRequest('Email и пароль обязательны'));
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.badRequest('Пользователь не найден'));
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return next(ApiError.badRequest('Неверный пароль'));
    }

    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email,
        username: user.username 
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        isPro: user.userType === 'pro'
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    next(ApiError.internal('Ошибка авторизации'));
  }
};

export const checkAuth = (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'Не авторизован' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        userType: user.userType,
        avatar: user.avatar
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.json({
      id: user.id,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      isPro: user.userType === 'pro',
      token
    });
  } catch (error) {
    console.error('CheckAuth error:', error);
    res.status(500).json({ message: 'Ошибка проверки аутентификации' });
  }
};

export const logout = (req, res) => {
  res.status(200).json({ message: 'Выход выполнен успешно' });
};