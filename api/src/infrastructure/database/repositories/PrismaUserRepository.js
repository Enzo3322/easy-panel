const prisma = require('../prisma');
const UserRepository = require('../../../domain/repositories/UserRepository');
const User = require('../../../domain/entities/User');

class PrismaUserRepository extends UserRepository {
  async create(user) {
    const createdUser = await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password
      }
    });
    
    return new User(
      createdUser.id,
      createdUser.name,
      createdUser.email,
      createdUser.password
    );
  }

  async findByEmail(email) {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) return null;
    
    return new User(
      user.id,
      user.name,
      user.email,
      user.password
    );
  }

  async findById(id) {
    const user = await prisma.user.findUnique({
      where: { id }
    });
    
    if (!user) return null;
    
    return new User(
      user.id,
      user.name,
      user.email,
      user.password
    );
  }

  async update(id, userData) {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: userData
    });
    
    return new User(
      updatedUser.id,
      updatedUser.name,
      updatedUser.email,
      updatedUser.password
    );
  }

  async delete(id) {
    await prisma.user.delete({
      where: { id }
    });
    
    return true;
  }
}

module.exports = PrismaUserRepository; 