import authRepository from "../repositories/auth.repository.js";

const loginService = async (email) => {
  try {
    const user = await authRepository.loginRepository(email);
    return user;
  } catch (error) {
    return error;
  }
};

const generateTokenService = async (_id) => {
  try {
    const token = await authRepository.generateTokenRepository(_id);
    return token;
  } catch (error) {
    return error;
  }
};

export default {
  loginService,
  generateTokenService,
};
