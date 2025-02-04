const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const setupSocket = require("./config/socket");
const routes = require("./routes");
const cors = require('cors');
dotenv.config();

// Initialize Express
const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

// Use routes
app.use("/api", routes);

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.IO
setupSocket(server);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
