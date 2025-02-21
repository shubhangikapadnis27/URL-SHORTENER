const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const urlRoutes = require("./routes/urlRoutes.js");
const analyticsRoutes = require("./routes/analyticsRoutes.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("Error: MONGO_URI is not defined in environment variables.");
    process.exit(1);
}

// Middleware
app.use(express.json());
app.use(cors());

// Use Routes
app.use('/api/url', urlRoutes);
app.use('/api/analytics', analyticsRoutes); 

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
})
.catch(err => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
});
