import objectSchema from "../schemas/news.schema.js";

const findAllRepository = async (skip, limit) => {
  const response = await objectSchema.news
    .find()
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit)
    .populate("user");
  return response;
};

const findNews = async () => {
  const response = await objectSchema.news
    .findOne()
    .sort({ _id: -1 })
    .populate("user");
  return response;
};

const createRepository = async (data) => {
  const response = await objectSchema.news.create(data);
  return response;
};

const countNewsRepository = async () => {
  const response = await objectSchema.news.countDocuments();
  return response;
};

export default {
  findAllRepository,
  findNews,
  createRepository,
  countNewsRepository,
};
