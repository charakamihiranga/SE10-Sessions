const express = require('express');
const bodyParser = require('body-parser');
const itemRoutes = require('./src/routes/itemRoutes');
const errorMiddleware = require('./src/middleware/errorMiddleware'); // Load environment variables from .env file
const cors = require('cors');



const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/items', itemRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
