import userService from "../services/UserService.js";

const userController = {
  // req - request from client
  // res - response from server
  getUserDetails: async (req, res) => {
    try {
      const userId = req.params.id; //http://localhost:3000/api/users/1
      // http://localhost:3000 - base url
      // /api - prefix
      // /users - endpoint
      // /1 - parameter
      const user = await userService.getUserDetails(userId);
      res.status(200).json({ status: "success", data: user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createUser: async (req, res) => {
    try {
      const userData = req.body; //json data from client
      //validation can be added here
      const user = await userService.createUser(userData);
      res.status(201).json({ status: "success", data: user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const updateData = req.body;
      const user = await userService.updateUser(userId, updateData);
      res.status(200).json({ status: "success", data: user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id;
      await userService.deleteUser(userId);
      res
        .status(200)
        .json({ status: "success", message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  changePassword: async (req, res) => {
    try {
      const userId = req.params.id;
      const { current_password, new_password } = req.body;
      await userService.changePassword(userId, current_password, new_password);
      res
        .status(200)
        .json({ status: "success", message: "Password changed successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default userController;
