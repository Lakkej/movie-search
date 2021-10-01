require("dotenv").config();
const axios = require("axios");

apiKey = process.env.APIKEY;

const queryBySearch = async (search, type, year, page) => {
  const urlString = `http://www.omdbapi.com/?apikey=${apiKey}&s=${search}&type=${type}&page=${page}&y=${year}`;
  console.log(urlString);
  var config = {
    method: "get",
    url: urlString,
    headers: {},
  };
  const { data } = await axios(config);
  return data;
};

const queryByID = async (id) => {
  const urlString = `http://www.omdbapi.com/?apikey=${apiKey}&i=${id}&plot=full`;
  console.log(urlString);
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
