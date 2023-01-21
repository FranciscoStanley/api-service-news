import bcrypt from "bcrypt";
import authService from "../services/auth.service.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await authService.loginService(email);

    if (!user) {
      res.status(400).json({
        data: {
          message: "User or Password not found",
        },
      });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    const token = await authService.generateTokenService(user._id);

    if (!passwordIsValid) {
      res.status(400).json({
        data: {
          message: "User or Password not found",
        },
      });
    } else {
      res.status(200).json({
        data: {
          message: "Login success",
          token,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      data: error.message,
    });
  }
};

export default {
  login,
};
