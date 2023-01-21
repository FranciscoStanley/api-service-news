import newsRepository from "../repositories/news.repository.js";

const getAllService = async (skip, limit) => {
  try {
    const response = await newsRepository.findAllRepository(skip, limit);
    return response;
  } catch (error) {
    return error;
  }
};

const topNewsService = async () => {
  try {
    const response = await newsRepository.findNews();
    return response;
  } catch (error) {
    return error;
  }
}

const createService = async (data) => {
  try {
    const response = await newsRepository.createRepository(data);
    return response;
  } catch (error) {
    return error;
  }
};

const countNews = async () => {
  try {
    const response = await newsRepository.countNewsRepository();
    return response;
  } catch (error) {
    return error;
  }
};

export default {
  getAllService,
  topNewsService,
  createService,
  countNews,
};
