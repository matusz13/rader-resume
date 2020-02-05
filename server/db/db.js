
const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const db = process.env.DATABASE;
console.log('MongoDB url...' + db);

const confy = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const connectDB = async () => {
    var app = [];
  try {
    await mongoose.connect(
      db, confy
      )
    
    console.log('MongoDB is Connected...');
  
  } catch (err) {
    console.error('mongo connect error: ' +err.message + ' .. ' + db);
    process.exit(1);
  }
    
};

const shortenURL = ( url) => {
    

};

module.exports = connectDB;