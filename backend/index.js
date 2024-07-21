const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/ProductRoutes');
const historyRoutes = require('./routes/historyRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cors()); 

// API routes
app.use('/api', productRoutes);
app.use('/api', historyRoutes);

app.get('/',(req,res)=>{
    res.send('server working')
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
