import jwt from "jsonwebtoken";
import userService from "../services/user.service.js";

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      res.status(401).json({
        message: "Not authorized",
      });
    }

    const parts = authorization.split(" ");
    const [shcema, token] = parts;

    if (parts.length !== 2 || shcema !== "Bearer") {
      res.status(401).json({
        message: "Not authorized. Token invalid",
      });
    }

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) {
        res.status(401).json({
          message: error.message,
        });
      }

      const user = await userService.getUserById(decoded._id);

      if (!user || !user._id) {
        res.status(401).json({
          message: "Token invalid",
        });
      }
      req.params = user._id;
      next();
    });
  } catch (error) {
    res.status(500).json({
      data: error.message,
    });
  }
};

export { authMiddleware };
