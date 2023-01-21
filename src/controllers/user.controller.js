import userService from "../services/user.service.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    if (users.length === 0) {
      return res.status(400).json({
        data: {
          message: "There are no registered users!",
        },
      });
    }

    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({
      data: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  const _id = req.params._id;

  try {
    const userId = await userService.getUserById(_id);
    res.status(200).json({ data: userId });
  } catch (error) {
    res.status(500).json({
      data: error.message,
    });
  }
};

const insertUser = async (req, res) => {
  const data = req.body;

  try {
    const { name, username, email, password, avatar, background } = data;

    if (!name || !username || !email || !password || !avatar || !background) {
      res.status(400).json({
        data: {
          message: "Submit all fields for registration!",
        },
      });
    }

    const hasUserEmail = await userService.getEmail(email);

    if (hasUserEmail) {
      return res.status(400).json({
        data: {
          message: "Error creating User",
        },
      });
    }

    const user = await userService.insertUser(data);

    if (!user) {
      return res.status(401).json({
        data: {
          message: "Error creating User!",
        },
      });
    }

    return res.status(201).json({
      data: {
        user: {
          id: user._id,
          name,
          username,
          email,
          avatar,
          background,
        },
        message: "User created successfully!",
      },
    });
  } catch (error) {
    res.status(500).json({
      data: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  const data = req.body;
  const _id = req.params._id;

  try {
    const { name, username, email, password, avatar, background } = data;

    if (!name && !username && !email && !password && !avatar && !background) {
      res.status(400).json({
        data: {
          message: "Submit at least one field for update!",
        },
      });
    }

    await userService.updateUser(
      _id,
      name,
      username,
      email,
      password,
      avatar,
      background
    );
    return res.status(200).json({
      data: {
        message: "User updated successfully!",
      },
    });
  } catch (error) {
    res.status(500).json({
      data: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const _id = req.params._id;
  try {
    const user = await userService.deleteUser(_id);
    res.status(200).json({
      data: {
        message: "User deleted",
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      data: error.message,
    });
  }
};

export default {
  getAllUsers,
  getUserById,
  insertUser,
  updateUser,
  deleteUser,
};
