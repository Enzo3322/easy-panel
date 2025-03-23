class AuthService {
  async hashPassword(password) {
    throw new Error('Method not implemented');
  }

  async comparePasswords(plainPassword, hashedPassword) {
    throw new Error('Method not implemented');
  }

  async generateToken(payload) {
    throw new Error('Method not implemented');
  }

  async verifyToken(token) {
    throw new Error('Method not implemented');
  }
}

module.exports = AuthService; 