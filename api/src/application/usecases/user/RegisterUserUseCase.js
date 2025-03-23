const { v4: uuidv4 } = require('uuid');
const User = require('../../../domain/entities/User');

class RegisterUserUseCase {
  constructor(userRepository, authService) {
    this.userRepository = userRepository;
    this.authService = authService;
  }

  async execute(userData) {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await this.authService.hashPassword(userData.password);
    
    const user = new User(
      uuidv4(),
      userData.name,
      userData.email,
      hashedPassword
    );

    return await this.userRepository.create(user);
  }
}

module.exports = RegisterUserUseCase; 