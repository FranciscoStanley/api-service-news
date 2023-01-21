import userRepository from "../repositories/user.repository.js";
import useValidator from "../validators/user.validator.js";

const getAllUsers = async (query = {}) => {
  try {
    return await userRepository.findAllUsers(query);
  } catch (error) {
    return error;
  }
};

const getUserById = async (_id) => {
  try {
    return await userRepository.findUserById(_id);
  } catch (error) {
    return error;
  }
};

const getEmail = async (email) => {
  try {
    return await userRepository.findEmail(email);
  } catch (error) {
    return error;
  }
};

const insertUser = async (data) => {
  try {
    return await userRepository.insertUser(data);
  } catch (error) {
    return error;
  }
};

const updateUser = async (
  _id,
  name,
  username,
  email,
  password,
  avatar,
  background
) => {
  const isInvalidId = useValidator.isInvalidId(_id);

  try {
    if (isInvalidId.error) {
      throw new Error(isInvalidId.message);
    }

    const response = await userRepository.updateUser(
      _id,
      name,
      username,
      email,
      password,
      avatar,
      background
    );

    return response;
  } catch (error) {
    return error;
  }
};

const deleteUser = async (_id) => {
  try {
    return await userRepository.deleteUser(_id);
  } catch (error) {
    return error;
  }
};

export default {
  getAllUsers,
  getUserById,
  getEmail,
  insertUser,
  updateUser,
  deleteUser,
};
