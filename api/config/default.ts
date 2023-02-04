export default {
  origin: 'http://localhost:3000',
  port: '8000',
  mongoPassword: process.env.MONGO_PASSWORD,
  mongoUser: process.env.MONGO_USER,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
};
