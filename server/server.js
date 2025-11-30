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

const allowedOrigins = [
    process.env.CLIENT_URL,
    'http://10.21.0.226:5173',
    'http://192.168.42.246:5173',
    'http://192.168.43.200:5173'
];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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