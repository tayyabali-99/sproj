const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Routes = require('./routes.js');
const { MongoClient } = require('mongodb');

// const uri = 'mongodb://localhost:27017/uni_app_db';
// const client = new MongoClient(uri);

const path = require('path');

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')));

// Anything that doesn't match the API routes will serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/uni_app_db';
const client = new MongoClient(uri);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToMongoDB();



const cors = require('cors');




const app = express();
const PORT = process.env.PORT || 5001;

console.log(PORT);

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log("DB not connectd",err));

app.use(bodyParser.json());

app.use(cors());
app.use('/api',Routes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

