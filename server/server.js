// This will serve two different clients: CLI client and GUI web client(Recat)

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const colors = require('colors');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const commandRoutes = require('./routes/commandRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

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

app.use(notFound);
app.use(errorHandler);








const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', ()=>{console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold)} )