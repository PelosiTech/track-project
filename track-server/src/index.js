require('./models/Users')
require('./models/Track')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'mongodb+srv://admin:passwordpassword@cluster0.sjlv7.mongodb.net/<dbname>?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log('ocnnected ot mongodb')
})
mongoose.connection.on('error', (err) => {
    console.error('error connecting to mongo', err)
})

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
    console.log('listening on port 3000')
})
