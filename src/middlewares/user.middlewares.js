import mongoose from "mongoose";
import userService from "../services/user.service.js";

const validId = async (req, res, next) => {
  const _id = req.params._id;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      data: {
        message: "Id not is valid!",
      },
    });
  }
  next();
};

const validUser = async (req, res, next) => {
  const _id = req.params._id;
  const user = await userService.getUserById(_id);

  if (!user) {
    return res.status(400).json({
      data: {
        message: "User not found!",
      },
    });
  }
  next();
};

export { validId, validUser };
