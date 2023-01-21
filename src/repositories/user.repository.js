import objectSchema from "../schemas/user.schema.js";

const findAllUsers = async (query) => {
  const response = await objectSchema.user.find(query);
  return response;
};

const findUserById = async (_id) => {
  const response = await objectSchema.user.findById(_id);
  return response;
};

const findEmail = async (email) => {
  const response = await objectSchema.user.findOne({
    email: email,
  });
  return response;
};

const insertUser = async (data) => {
  const response = await objectSchema.user.create(data);
  return response;
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
  const response = await objectSchema.user.findOneAndUpdate(
    { _id },
    { name, username, email, password, avatar, background }
  );
  return response;
};

const deleteUser = async (_id) => {
  const response = await objectSchema.user.findByIdAndDelete({
    _id,
  });
  return response;
};

export default {
  findAllUsers,
  findUserById,
  findEmail,
  insertUser,
  updateUser,
  deleteUser,
};
