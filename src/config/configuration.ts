export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USER || 'localhost',
    password: process.env.DATABASE_PASS || 'localhost',
    database: process.env.DATABASE_NAME || 'localhost',
  },
  cache: {
    host: process.env.REDIS_HOST || 'redis',
    post: parseInt(process.env.REDIS_PORT, 10) || 6380,
  },
  jwt_secret: process.env.JWT_SECRET,
});
