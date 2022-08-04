const axios = require("axios");

exports.DisplayData = function (req, res) {
  const schemeID = Math.floor(Math.random() * 17941);
  const url = `https://www.colr.org/json/scheme/${schemeID}`;

  axios
    .get(url)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};
