const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust this path if your model is located elsewhere

// Replace with your actual MongoDB connection string
require('dotenv').config(); // Make sure dotenv is installed and required at the top
const MONGO_URI = process.env.MONGO_URI; 


const seedDatabase = async () => {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected for seeding...');

    // 2. Clear existing users to avoid duplicates
    await User.deleteMany({});
    console.log('Old users cleared.');

    // 3. Create the admin user
    // Note: We use .create() so the password pre-save hook is triggered!
    await User.create({
      name: 'User Name', // Replace with your name
      email: 'user@example.com', // Replace with your email
      password: 'password123',     // Replace with your secure password (it will be hashed automatically)
      isAdmin: true,
    });

    console.log('Admin user successfully created and seeded!');
    
    // 4. Disconnect
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();
