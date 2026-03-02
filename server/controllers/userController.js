import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ApiError from '../error/ApiError.js';
import { User } from '../models/user.js';
import { Op } from 'sequelize'; 

export const registration = async (req, res, next) => {
  try {
    const { email, password, userType, username } = req.body;

   
    if (!email || !password) {
      return next(ApiError.badRequest('Email and password are required'));
    }

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest('User with this email already exists'));
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
        avatarUrl: user.avatar,
        isPro: user.userType === 'pro'
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    next(ApiError.internal('Registration failed'));
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(ApiError.badRequest('Email and password are required'));
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.badRequest('User not found'));
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return next(ApiError.badRequest('Invalid password'));
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
    next(ApiError.internal('Login failed'));
  }
};

export const checkAuth = (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'Not authenticated' });
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
    res.status(500).json({ message: 'Error checking authentication' });
  }
};

export const logout = (req, res) => {

  res.status(200).json({ message: 'Successfully logged out' });
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { email } = req.body;
    
    const user = await User.findByPk(userId);
    if (!user) {
      return next(ApiError.notFound('User not found'));
    }

    if (email && email !== user.email) {
  
      const existingUser = await User.findOne({ 
        where: { 
          email,
          id: { [Op.ne]: userId }
        } 
      });
      
      if (existingUser) {
        return next(ApiError.badRequest('Email already in use'));
      }
      
      user.email = email;
    }

    if (req.file) {
      user.avatar = `/static/${req.file.filename}`;
    }
    
    await user.save();

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
    console.error('Error updating profile:', error);
    next(ApiError.internal('Error updating profile: ' + error.message));
  }
};
