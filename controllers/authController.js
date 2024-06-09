// Importing required modules
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For generating JWTs
const prisma = require('../DBCon/db'); // Prisma client for database operations
require('dotenv').config(); // To use environment variables
const { JWT_SECRET } = process.env; // JWT secret key

// Register function
exports.register = async (req, res) => {
  // Destructure email, password, and address from request body
  const { email, password, address } = req.body;

  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Create a new user in the database using Prisma client
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        address
      }
    });

    // Send the created user as a response
    res.json(user);

  } catch (error) {
    // If there's an error, send it as a response with status code 500
    res.status(500).json({ error: error.message });
  }
};

// Login function
exports.login = async (req, res) => {
  // Destructure email and password from request body
  const { email, password } = req.body;

  try {
    // Find the user in the database using Prisma client
    const user = await prisma.user.findUnique({ where: { email } });

    // If the user is not found, send an error message with status code 400
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database called authentication
    const validPassword = await bcrypt.compare(password, user.password);

    // If the password is not valid, send an error message with status code 400
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // If the password is valid, generate a JWT for the user, below token is for authorization.
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    // Send the JWT as a response
    res.json({ token });
  } catch (error) {
    // If there's an error, send it as a response with status code 500
    res.status(500).json({ error: error.message });
  }
};