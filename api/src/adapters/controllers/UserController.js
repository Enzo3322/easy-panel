class UserController {
  constructor(registerUserUseCase, loginUserUseCase) {
    this.registerUserUseCase = registerUserUseCase;
    this.loginUserUseCase = loginUserUseCase;
  }

  async register(req, res) {
    try {
      const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      };

      const user = await this.registerUserUseCase.execute(userData);
      
      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email
      });
    } catch (error) {
      if (error.message === 'Email already in use') {
        return res.status(409).json({ message: error.message });
      }
      
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await this.loginUserUseCase.execute(email, password);
      
      return res.status(200).json(result);
    } catch (error) {
      if (error.message === 'Invalid credentials') {
        return res.status(401).json({ message: error.message });
      }
      
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = UserController; 