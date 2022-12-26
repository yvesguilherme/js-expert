const UserRepository = require("../repository/userRepository");
const UserService = require("../service/userService");
const Database = require("../util/database");

class UserFactory {
  static async createInstance() {
    const database = new Database({ connectionString: 'mongodb://localhost:3128' });
    const dbConnection = await database.connect();
    const userRepository = new UserRepository({ dbConnection });
    const userService = new UserService({ userRepository });

    return userService;
  }
}

module.exports = UserFactory;