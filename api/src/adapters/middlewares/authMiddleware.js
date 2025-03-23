const JwtAuthService = require('../../infrastructure/services/JwtAuthService');
const authService = new JwtAuthService();

const validateRequest = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ message: 'Access denied. No token provided' });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = await authService.verifyToken(token);
    
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = validateRequest; 