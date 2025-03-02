require('dotenv').config();
process.removeAllListeners('warning');
process.on('warning', (warning) => {
  if (warning.name === 'DeprecationWarning' && warning.message.includes('punycode')) return;
  console.warn(warning.name, warning.message);
});

// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const aleph = require('aleph-js');
const CryptoJS = require('crypto-js');
const User = require('./models/user');

// Initialize express
const app = express();

// Middleware configuration
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// MongoDB Connection with retry logic
const connectDB = async (retries = 5) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("✅ Database connected successfully");
  } catch (err) {
    console.error("❌ Database connection error:", err);
    if (retries > 0) {
      console.log(`Retrying connection... (${retries} attempts remaining)`);
      setTimeout(() => connectDB(retries - 1), 5000);
    }
  }
};

connectDB();

// Encryption and decryption functions
const encryptMessage = (message, symmetricKey) => {
  return CryptoJS.AES.encrypt(message, symmetricKey).toString();
};

const decryptMessage = (encryptedMessage, symmetricKey) => {
  const bytes = CryptoJS.AES.decrypt(encryptedMessage, symmetricKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const generateEncryptionKey = () => CryptoJS.lib.WordArray.random(256/8).toString();

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role }, 
    process.env.JWT_SECRET, 
    { expiresIn: '24h' }
  );
};

// Authentication middleware
const verifyToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Routes
app.post("/signup", async (req, res) => {
  console.log("Signup request received:", req.body);
  try {
    // Validate required fields
    if (!req.body.fullName || !req.body.email || !req.body.password || !req.body.role) {
      return res.status(400).json({ 
        message: "Missing required fields: fullName, email, password, and role are required" 
      });
    }

    // Check if the email is already in use
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email address already in use." });
    }

    // Hash the password
    const saltRounds = process.env.saltRounds ? parseInt(process.env.saltRounds) : 10;
    const hash = await bcrypt.hash(req.body.password.toString(), saltRounds);

    // Create the user object
    const user = {
      fullName: req.body.fullName,
      email: req.body.email,
      password: hash,
      role: req.body.role,
      specialization: req.body.role === 'teacher' ? req.body.specialization : undefined,
      courses: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    };

    // Save the user to the database
    const newUser = await User.create(user);

    // Generate a JWT token
    const token = generateToken(newUser); 

    // Return the response
    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
        specialization: newUser.specialization,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
        isActive: newUser.isActive,
      }
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("Sign In Error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

app.get("/profile", verifyToken, async (req, res) => {
  if (req.user) {
    try {
      // Validate if the _id is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(req.user.userId)) {
        return res.status(400).send("Invalid user ID");
      }
      const user = await User.findById(req.user.userId); 
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.send({ user: user });
    } catch (err) {
      return res.status(400).send("Error fetching user profile");
    }
  } else {
    return res.status(401).send("Unauthorized");
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Performing graceful shutdown...');
  mongoose.connection.close();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Received SIGINT. Performing graceful shutdown...');
  mongoose.connection.close();
  process.exit(0);
});