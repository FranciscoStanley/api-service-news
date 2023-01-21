import newsService from "../services/news.service.js";

const getAll = async (req, res) => {
  let { skip, limit } = req.query;
  const currentUrl = req.baseUrl;

  skip = Number(skip);
  limit = Number(limit);

  try {
    if (!skip) {
      skip = 0;
    }

    if (!limit) {
      limit = 5;
    }

    const news = await newsService.getAllService(skip, limit);
    const total = await newsService.countNews();
    
    const next = skip + limit;
    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}&skip=${next}` : null;
    const previous = skip - limit < 0 ? null : baseUrl;
    const previousUrl =
      previous != null ? `${currentUrl}?limit=${limit}&skip=${previous}` : null;

    if (news.length === 0) {
      res.status(400).json({
        data: {
          message: "There are no registered news",
        },
      });
    }

    res.status(200).json({
      data: {
        message: "Get success",
        nextUrl,
        previousUrl,
        limit,
        skip,
        total,
        
        results: news.map((item) => ({
          _id: item._id,
          title: item.title,
          text: item.text,
          banner: item.banner,
          likes: item.likes,
          comments: item.comments,

          //user: item.user._id,
          //name: item.user.name,
          //username: item.user.username,
          //avatar: item.user.avatar
        })),
      },
    });
    
  } catch (error) {
    res.status(500).json({
      data: error.message,
    });
  }
};


const topNews = async (req, res) => {

  try {
    const news = await newsService.topNewsService()

    if (!news) {
      return res.status(400).json({message: "There is no registered post"});
    }

    res.status(200).send({
      data: {
        _id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,

        //user: news.user._id,
        //name: news.user.name,
        //username: news.user.username,
        //avatar: news.user.avatar
      },
    });

  } catch (error) {
    res.status(500).json({
      data: error.message,
    });
  }
  
}

const create = async (req, res) => {
  const _id = req.params._id;
  const { authorization } = req.headers;
  const { title, text, banner } = req.body;
  try {
    if (!authorization) {
      res.status(401).json({
        message: "Not authorized",
      });
    }

    const parts = authorization.split(" ");
    const [shcema, token] = parts;

    if (parts.length !== 2) {
      res.status(401).json({
        message: "Not authorized",
      });
    }

    if (shcema !== "Bearer") {
      res.status(401).json({
        message: "Not authorized",
      });
    }

    if (!title || !text || !banner) {
      res.status(400).json({
        message: "Submmit all fields",
      });
    }

    const response = await newsService.createService({
      title,
      text,
      banner,
      user: _id,
    });

    res.status(201).json({
      data: {
        message: "Created success",
        response,
      },
    });
  } catch (error) {
    res.status(500).json({
      data: error.message,
    });
  }
};

export default {
  getAll,
  topNews,
  create,
};
