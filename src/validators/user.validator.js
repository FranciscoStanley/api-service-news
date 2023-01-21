import mongoose from "mongoose";

const isInvalidId = async (_id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return { message: "Id is invalid", error: true };
    }
  } catch (error) {
    return error;
  }
};

export default {
  isInvalidId,
};
