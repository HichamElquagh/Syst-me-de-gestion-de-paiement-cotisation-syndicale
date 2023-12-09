const mongoose = require('mongoose');
const DATABASE_URL  = process.env.DATABASE_URL // Import your database URL from the configuration file

function connectDatabase() {
  mongoose.connect(DATABASE_URL, {
    w: 'majority'
    
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to the MongoDB database');
  });
}

module.exports = connectDatabase;
