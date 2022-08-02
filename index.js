require('dotenv').config()
const express = require('express');
const axios = require("axios")
const path = require('path')

const app = express();
const port = process.env.PORT || "8000";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug")
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", {title: "Home"});
})

app.get("/user", (req, res) => {
  res.render("user", {title: "Profile", userProfile: {nickname: "Auth0"}})
})


app.get("/colors", async (req, res) => {
  const randomColor = Math.floor(Math.random()*16777215).toString(16);

  const url = `https://www.thecolorapi.com/scheme?hex=${randomColor}&format=json&mode=analogic&count=6`
  
  const fetchColors = () => {
    axios.get(url)
        .then(response => {
          const colorObject = {}
          const favObject = {'0': '#FF5733'}
          let index = 0

          for (let i = 0; i < response.data.colors.length; i++) {
            let colorArray = Object.values(colorObject)

            if (!colorArray.includes(response.data.colors[i].name.closest_named_hex)) {
              colorObject[index] = response.data.colors[i].name.closest_named_hex
              index++
            }
          }
          console.log(colorObject, "colorObject")
            res.render("colors", {colors: colorObject, favs: favObject})
        })
        .catch(error => console.error(error));
  };

  fetchColors();
})

app.post("/colors", function (req, res) {
  console.log(res.data)
  res.render('colors', {
    colors: colorObject, favs: favObject
  }).catch(error => console.error(error));
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})