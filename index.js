require ('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const authRoutes = require('./routes/auth_route');
const userRoutes = require('./routes/users_routes');
const organisationRoutes = require('./routes/org_routes');

const {authenticationToken} = require('./middlewares/authMiddleware');

app.use(express.json());
app.use('/auth_routes', authRoutes);
app.use('/api/users_routes', authenticationToken, userRoutes);
app.use('/api/org_routes', authenticationToken, organisationRoutes);

app.listen(port, () => {
    console.log('server running on port ${port}');
})