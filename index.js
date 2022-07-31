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

// app.get("/colors", (req, res) => {
//   res.render("colors", {title: "Colors"})
// })
// const colorController = require('./colors_controller')
app.get("/colors", async (req, res) => {
  // res.render("colors", colorController.DisplayData)
  // console.log("Hi")
  const randomColor = Math.floor(Math.random()*16777215).toString(16);

  const url = `https://www.thecolorapi.com/scheme?hex=${randomColor}&format=json&mode=analogic&count=6`

  

  // const fetchScheme = async () => {
  //   axios.get(url).then((data) => {
  //     console.log(data.data)
  //   })
  // }
  // fetchScheme()

  // axios.get(url).then((req, res) => console.log(res.data)).catch(err => console.log(err));
  // console.log(JSON.stringify(scheme))

  // res.render("colors", {colors: scheme.data.schemes[0].colors})

  
  const fetchColors = () => {
    axios.get(url)
        .then(response => {

          const color1 = response.data.colors[0].name.closest_named_hex
          const color2 = response.data.colors[1].name.closest_named_hex
          const color3 = response.data.colors[2].name.closest_named_hex
          const color4 = response.data.colors[3].name.closest_named_hex
          const color5 = response.data.colors[4].name.closest_named_hex
          const color6 = response.data.colors[5].name.closest_named_hex
            // const colors = response.schemes
            // console.log("response.data", response.data)
            // console.log(`GET list users`, colors);
            res.render("colors", {colors: {1: color1, 2: color2, 3: color3, 4: color4, 5: color5, 6: color6}})
        })
        .catch(error => console.error(error));
  };

  fetchColors();

  // res.render("colors", {colors: "blue"})
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})