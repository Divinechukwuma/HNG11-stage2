const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Organisation = require('../models/organisation');
const { validateUser } = require('../utils/validation');

const register = async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;
  
  // Validate input
  const { errors, valid } = validateUser({ firstName, lastName, email, password });
  if (!valid) {
    return res.status(422).json({ errors });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    const { data: user, error: userError } = await User.create({
      userId,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone
    });

    if (userError) {
      throw new Error('Registration unsuccessful');
    }

    const orgName = `${firstName}'s Organisation`;
    const { data: org, error: orgError } = await Organisation.create({
      name: orgName,
      userId
    });

    if (orgError) {
      throw new Error('Organisation creation unsuccessful');
    }

    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      status: 'success',
      message: 'Registration successful',
      data: {
        accessToken: token,
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        }
      }
    });
  } catch (error) {
    res.status(400).json({ status: 'Bad request', message: error.message, statusCode: 400 });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data: user, error: userError } = await User.findByEmail(email);

    if (userError || !user) {
      throw new Error('Authentication failed');
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new Error('Authentication failed');
    }

    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        accessToken: token,
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        }
      }
    });
  } catch (error) {
    res.status(401).json({ status: 'Bad request', message: error.message, statusCode: 401 });
  }
};

module.exports = { register, login };
