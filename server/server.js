//this will serve two different clients: CLI client and GUI client
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const colors = require('colors');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const commandRoutes = require('./routes/commandRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const messageRoutes = require('./routes/messageRoutes.js');

const path = require('path');//path module to handle file paths(in this case, for uploads)

// Create uploads directory if it doesn't exist
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads/projects');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

dotenv.config();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));

connectDB()

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.get('/',(req, res)=>{
  res.send("API running...")
})
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/commands', commandRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/messages', messageRoutes);

app.use(notFound);
app.use(errorHandler);




const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', ()=>{console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold)} )