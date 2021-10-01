const express = require("express"); //import express¨

const SearchEngine = require("./middleware/omdbSearch");

const router = express.Router();

//const redisClient = require("./middleware/redisClient")

router.get("/search", async (req, res, next) => {
  try {
    console.log(req.query);
    if (req.query.detail) {
      const { i } = req.query;
      const data = await SearchEngine.queryByID(i);
      console.log(data);
      res.json(data);
    } else {
      const { s, type, y = "", page = 1 } = req.query;
      const data = await SearchEngine.queryBySearch(s, type, y, page);
      console.log(data);
      res.json(data);
    }
  } catch (error) {
    res.json(error);
  }
});

router.get("/login", (req, res, next) => {
  res.json({ message: `Accessing: ${req.path}` }); // dummy function for now
});

module.exports = router;
