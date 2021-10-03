const express = require("express"); //import express¨

const SearchEngine = require("./middleware/omdbSearch");

const router = express.Router();

const { createClient } = require("redis");

let tryDB = true;
//Gets cache via query

const getCache = async (client, queryKey) => {
  try {
    const cache = await client.get(queryKey);
    return cache;
  } catch (error) {
    console.log(error);
  }
};
//caches found query if it was not done before
const setCache = async (client, queryKey, data) => {
  try {
    client.set(queryKey, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

router.get("/search", async (req, res, next) => {
  let client = null;
  //Trying to connect to Redis-server
  try {
    if (tryDB === true) {
      client = createClient({
        socket: { reconnectStrategy: new Error("Fuck off") },
      });
      client.on("error", (err) => {
        console.log(err);
        tryDB = false;
      });
      await client.connect();
    }
  } catch (error) {
    client = "error";
    console.log(error);
  }

  try {
    //Decides if we are searching by ID or by Title
    // Asks if there has been an error in connection to Redis, if there was skips caching.
    if (req.query.detail) {
      const { i } = req.query;
      const cacheResult = tryDB === true ? await getCache(client, i) : null;
      if (cacheResult !== null) {
        const cacheObj = await JSON.parse(cacheResult);
        res.json(cacheObj);
        return;
      } else {
        const data = await SearchEngine.queryByID(i);
        if (tryDB === true) {
          setCache(client, i, data);
        }
        res.json(data);
      }
    } else {
      const { s, type, y = "", page = 1 } = req.query;
      const cacheQuery = `${s}${type}${y}${page}`;
      const cacheResult =
        tryDB === true ? await getCache(client, cacheQuery) : null;
      //checkes if the cache for this query is empty
      if (cacheResult !== null) {
        const cacheObj = await JSON.parse(cacheResult);
        res.json(cacheObj);
        return;
      //if cache is empty, fetches it from OMDb and caches it
      } else {
        const data = await SearchEngine.queryBySearch(s, type, y, page);
        if (tryDB === true) {
          setCache(client, cacheQuery, data);
        }
        res.json(data);
      }
    }
  } catch (error) {
    res.json(error);
    return;
  }
});
router.get("/login", (req, res, next) => {
  res.json({message: "Logged in"}); 
});

module.exports = router;
