// Repositories
const PrismaUserRepository = require('../database/repositories/PrismaUserRepository');
const PrismaTeamRepository = require('../database/repositories/PrismaTeamRepository');
const PrismaUserTeamRepository = require('../database/repositories/PrismaUserTeamRepository');
const PrismaSprintRepository = require('../database/repositories/PrismaSprintRepository');
const PrismaTaskRepository = require('../database/repositories/PrismaTaskRepository');

// Services
const JwtAuthService = require('../services/JwtAuthService');

// Use Cases
const RegisterUserUseCase = require('../../application/usecases/user/RegisterUserUseCase');
const LoginUserUseCase = require('../../application/usecases/user/LoginUserUseCase');
const CreateTeamUseCase = require('../../application/usecases/team/CreateTeamUseCase');
const InviteUserToTeamUseCase = require('../../application/usecases/team/InviteUserToTeamUseCase');
const CreateSprintUseCase = require('../../application/usecases/sprint/CreateSprintUseCase');
const CreateTaskUseCase = require('../../application/usecases/task/CreateTaskUseCase');
const UpdateTaskStatusUseCase = require('../../application/usecases/task/UpdateTaskStatusUseCase');

// Controllers
const UserController = require('../../adapters/controllers/UserController');
const TeamController = require('../../adapters/controllers/TeamController');
const SprintController = require('../../adapters/controllers/SprintController');
const TaskController = require('../../adapters/controllers/TaskController');

// Routes
const userRoutes = require('../http/routes/userRoutes');
const teamRoutes = require('../http/routes/teamRoutes');
const sprintRoutes = require('../http/routes/sprintRoutes');
const taskRoutes = require('../http/routes/taskRoutes');

const setupDependencies = () => {
  // Repositories
  const userRepository = new PrismaUserRepository();
  const teamRepository = new PrismaTeamRepository();
  const userTeamRepository = new PrismaUserTeamRepository();
  const sprintRepository = new PrismaSprintRepository();
  const taskRepository = new PrismaTaskRepository();

  // Services
  const authService = new JwtAuthService();

  // Use Cases
  const registerUserUseCase = new RegisterUserUseCase(userRepository, authService);
  const loginUserUseCase = new LoginUserUseCase(userRepository, authService);
  const createTeamUseCase = new CreateTeamUseCase(teamRepository, userTeamRepository);
  const inviteUserToTeamUseCase = new InviteUserToTeamUseCase(userRepository, teamRepository, userTeamRepository);
  const createSprintUseCase = new CreateSprintUseCase(sprintRepository, teamRepository, userTeamRepository);
  const createTaskUseCase = new CreateTaskUseCase(taskRepository, teamRepository, userTeamRepository, sprintRepository);
  const updateTaskStatusUseCase = new UpdateTaskStatusUseCase(taskRepository, userTeamRepository);

  // Controllers
  const userController = new UserController(registerUserUseCase, loginUserUseCase);
  const teamController = new TeamController(createTeamUseCase, inviteUserToTeamUseCase, teamRepository);
  const sprintController = new SprintController(createSprintUseCase, sprintRepository);
  const taskController = new TaskController(createTaskUseCase, updateTaskStatusUseCase, taskRepository);

  // Routes
  const userRouter = userRoutes(userController);
  const teamRouter = teamRoutes(teamController);
  const sprintRouter = sprintRoutes(sprintController);
  const taskRouter = taskRoutes(taskController);

  return {
    userRouter,
    teamRouter,
    sprintRouter,
    taskRouter
  };
};

module.exports = setupDependencies; 