require('dotenv').config();
const createApp = require('./app');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  const app = createApp();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch(err => {
  console.error('Server startup failed:', err);
  process.exit(1);
});

module.exports = startServer; 