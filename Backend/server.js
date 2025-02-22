// Environment and warning handling
require('dotenv').config();
process.removeAllListeners('warning');
process.on('warning', (warning) => {
  if (warning.name === 'DeprecationWarning' && warning.message.includes('punycode')) return;
  console.warn(warning.name, warning.message);
});

// Import dependencies
const express = require('express');
<<<<<<< HEAD
=======
const mongoose = require('mongoose');
>>>>>>> 8a851b1e8eceb6d800833f62a99cf3d726dd6846
const cors = require('cors');
const connectDB = require('../backend/config/db');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const aleph = require('aleph-js');
const CryptoJS = require('crypto-js');
<<<<<<< HEAD

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Encryption and decryption functions
const encryptMessage = (message, symmetricKey) => {
=======
const NodeRSA = require('node-rsa');

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
>>>>>>> 8a851b1e8eceb6d800833f62a99cf3d726dd6846
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://dhrupesh:DK_dk@lab.pk1pccj.mongodb.net/labData", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
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

app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

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

<<<<<<< HEAD
// Signup Route
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
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );

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

// Signin Route
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
    const token = jwt.sign(
      { userId: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("Sign In Error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// Profile Route
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

// Fetch Posts Route
app.get("/posts", verifyToken, async (req, res) => {
  const room = "hall";
  const api_server = "https://api2.aleph.im";
  
  // Ensure valid integers for page and limit
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;

  if (page < 1 || limit < 1) {
    return res.status(400).json({ error: "Invalid page or limit values" });
  }

=======
// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Routes
app.post("/signup", async (req, res) => {
>>>>>>> 8a851b1e8eceb6d800833f62a99cf3d726dd6846
  try {
    const { email, password, name, role } = req.body;

    // Validate required fields
    if (!email || !password || !name || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
    const hash = await bcrypt.hash(password.toString(), saltRounds);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hash,
      role,
      courses: [],
      createdAt: new Date()
    });
<<<<<<< HEAD
    if (response && response.posts) {
      return res.json(response.posts); // Return only the posts
    } else {
      return res.status(404).json({ error: "No posts found" });
    }
  } catch (err) {
    console.error("Error fetching posts:", err.message);
    return res.status(500).json({ error: "Error fetching posts", details: err.message });
  }
});

// Fetch Posts by Name Route
app.get("/posts/:name", verifyToken, async (req, res) => {
  const room = req.params.name;
  console.log(room);
  const api_server = "https://api2.aleph.im";
  
  // Ensure valid integers for page and limit
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
=======

    // Generate token
    const token = generateToken(newUser);
>>>>>>> 8a851b1e8eceb6d800833f62a99cf3d726dd6846

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Error creating user" });
  }
});

<<<<<<< HEAD
// Message Route
app.post("/message", verifyToken, async (req, res) => {
  if(req.user){
    try {
      const Auth_user = await User.findById(req.user.userId);

      if (!Auth_user || !Auth_user.private_key) {
        return res.status(400).send("User private key not found");
      }
      
      console.log('Message received:', {
        content: req.body.content,
        symmetricKey: Auth_user.symmetric_key
      });

      const account = await aleph.ethereum.import_account({ private_key: Auth_user.private_key });
      
      // Decrypt the message before storing
      let messageToStore;
      if (req.body.content.isEncrypted) {
        messageToStore = decryptMessage(req.body.content.body, Auth_user.symmetric_key);
        console.log('Decryption result:', {
          original: req.body.content.body,
          decrypted: messageToStore
        });
      } else {
        messageToStore = req.body.content.body;
      }

      res.status(200).json({
        status: "success",
        message: "Message stored successfully",
        decryptedMessage: messageToStore // Return for verification
      });
    } catch (err) {
      console.error("Error in /message route: ", err);
      res.status(500).send("Error processing message");
    }
  }
});

// Post Message Route
app.post("/posts/:name", verifyToken, async (req, res) => {
  console.log("Request body: " + req.body.content.body);
  if(req.user){
      try {
        const Auth_user = await User.findById(req.user.userId);
    
        if (!Auth_user || !Auth_user.private_key) {
          return res.status(400).send("User private key not found");
        }
        
        const account = await aleph.ethereum.import_account({ private_key: Auth_user.private_key });
        console.log("Account symmetric key: " + Auth_user.symmetric_key);
        // The message is now received in an encrypted format
        // Encrypt the message content using the symmetric key
        const messageToEncrypt = req.body.content.body;
        const symmetricKey = Auth_user.symmetric_key;
        
        // Create a cipher using the symmetric key
        const cipher = crypto.createCipher('aes-256-cbc', symmetricKey);
        let encryptedMessage = cipher.update(messageToEncrypt, 'utf8', 'hex');
        encryptedMessage += cipher.final('hex');

        const encryptedContent = {
          body: encryptedMessage,
          isEncrypted: true
        };
        console.log("Encrypted content: " + encryptedContent);
        // const chat = await aleph.posts.submit(account.address, 'chat', { 
        //   body: encryptedContent
        // }, {
        //   ref: req.params.name,
        //   api_server: process.env.api_server,
        //   account: account,
        //   channel: "TEST"
        // });
        
        console.log("Blockchain chat log: " + chat);
        res.status(200).send("Encrypted message sent");
      } catch (err) {
        console.log("Error in /message route: ", err);
        res.status(500).send("Error sending message");
      }
  }
});

// Verify Token Middleware
async function verifyToken(req, res, next) {  
  // Extract the token from the 'Authorization' header
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1]; // Split by space, not '='  
  if (!token) return res.status(401).send("Access denied");
=======
app.post("/signin", async (req, res) => {
>>>>>>> 8a851b1e8eceb6d800833f62a99cf3d726dd6846
  try {
    const { email, password } = req.body;

<<<<<<< HEAD
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
=======
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // Find user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Error during login" });
  }
});

// Protected routes
app.use('/api', verifyToken);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Performing graceful shutdown...');
  mongoose.connection.close();
  process.exit(0);
>>>>>>> 8a851b1e8eceb6d800833f62a99cf3d726dd6846
});