const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');
const path = require('path');
require('dotenv').config();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const learnRoutes = require('./routes/learn');
const progressRoutes = require('./routes/progress');
const auth = require('./middleware/auth')

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/auth', authRoutes);
app.use('/api/module',auth, learnRoutes);
app.use('/api/progress',auth, progressRoutes);
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl} - Body:`, req.body);
  next();
});

app.get('/reset-password/:token', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/public/reset-password.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
