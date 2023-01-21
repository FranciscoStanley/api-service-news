import objectSchema from "../schemas/user.schema.js";
import jwt from "jsonwebtoken";

const loginRepository = async (email) => {
  const response = await objectSchema.user
    .findOne({ email: email })
    .select("+password");
  return response;
};

const generateTokenRepository = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_JWT, { expiresIn: "5h" });
};

export default {
  loginRepository,
  generateTokenRepository,
};
