const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AuthService = require('../../application/ports/AuthService');

class JwtAuthService extends AuthService {
  constructor() {
    super();
    this.secret = process.env.JWT_SECRET;
  }

  async hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async comparePasswords(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async generateToken(payload) {
    return jwt.sign(payload, this.secret, { expiresIn: '24h' });
  }

  async verifyToken(token) {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      return null;
    }
  }
}

module.exports = JwtAuthService; 