import bcrypt from 'bcrypt';
import ApiError from '../error/ApiError.js';
import { User } from '../models/user.js';

export const registration = async (req, res, next) => {
  try {
    console.log('Request body:', req.body); // ADD THIS LINE
    console.log('Request file:', req.file); // ADD THIS LINE
    
    const { email, password, userType, username } = req.body;

    if (!email || !password) {
      console.log('Missing email or password');
      return next(ApiError.badRequest('Email and password are required'));
    }

    console.log('Checking for existing user with email:', email);
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      console.log('User already exists');
      return next(ApiError.badRequest('User with this email already exists'));
    }

    let avatarImage = null;
    if (req.file) {
      avatarImage = `/static/${req.file.filename}`;
      console.log('Avatar saved at:', avatarImage);
    } else {
      console.log('No avatar file uploaded');
    }

    console.log('Hashing password...');
    const hashPassword = await bcrypt.hash(password, 5);

    console.log('Creating user with data:', {
      email,
      userType: userType || 'normal',
      username: username || email.split('@')[0],
      avatar: avatarImage,
      password: '[HIDDEN]'
    });

    const user = await User.create({
      email,
      userType: userType || 'normal',
      username: username || email.split('@')[0],
      avatar: avatarImage,
      password: hashPassword
    });

    console.log('User created successfully with ID:', user.id);

  
    res.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatarUrl: user.avatar,
        isPro: user.userType === 'pro'
      }
    });
  } catch (error) {
    console.error('Registration error DETAILS:', error); // ADD THIS LINE
    next(ApiError.internal('Ошибка регистрации'));
  }
};