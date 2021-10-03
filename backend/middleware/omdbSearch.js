require("dotenv").config();
const axios = require("axios");

apiKey = "131b0f8e";

//Searching for multiple movies/series by search, type, page and year
const queryBySearch = async (search, type, year, page) => {
  const urlString = `http://www.omdbapi.com/?apikey=${apiKey}&s=${search}&type=${type}&page=${page}&y=${year}`;
  var config = {
    method: "get",
    url: urlString,
    headers: {},
  };
  const { data } = await axios(config);
  return data;
};
//Searching for specific content OMDB via ID
const queryByID = async (id) => {
  const urlString = `http://www.omdbapi.com/?apikey=${apiKey}&i=${id}&plot=short`;
  var config = {
    method: "get",
    url: urlString,
    headers: {},
  };
  const { data } = await axios(config);
  return data;
};
exports.queryBySearch = queryBySearch;
exports.queryByID = queryByID;
