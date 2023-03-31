require('dotenv').config();

const { PORT = 'PORT' || 3000} = process.env;
const { DB_ADDRESS = 'DB_ADDRESS' ||  'mongodb://127.0.0.1:27017/mestodb'} = process.env;
const { JWT_SECRET = 'JWT_SECRET' || 'some-secret-key'} = process.env;

module.exports = {
  PORT,
  JWT_SECRET,
  DB_ADDRESS,
};
