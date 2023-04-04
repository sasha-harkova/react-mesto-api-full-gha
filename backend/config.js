require('dotenv').config();

const PORT = process.env.PORT || 3000;
const DB_ADDRESS = process.env.DB_ADDRESS || 'mongodb://127.0.0.1:27017/mestodb';

if (process.env.NODE_ENV === "production") {
  JWT_SECRET = process.env.JWT_SECRET
} else {
  JWT_SECRET = "secret-key"
}

module.exports = {
  PORT,
  DB_ADDRESS,
  JWT_SECRET,
};