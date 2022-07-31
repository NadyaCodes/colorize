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
  const schemeID = Math.floor(Math.random() * 17941)
  const url = "https://www.thecolorapi.com/scheme?hex=0047AB&rgb=0,71,171&hsl=215,100%,34%&cmyk=100,58,0,33&format=json&mode=analogic&count=6"

  

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
          console.log("hi")
          console.log("color1", response.data.colors[0].name.closest_named_hex)
          console.log("color2", response.data.colors[1].name.closest_named_hex)
          console.log("color3", response.data.colors[2].name.closest_named_hex)
          console.log("color4", response.data.colors[3].name.closest_named_hex)
          console.log("color5", response.data.colors[4].name.closest_named_hex)
          console.log("color6", response.data.colors[5].name.closest_named_hex)
            // const colors = response.schemes
            // console.log("response.data", response.data)
            // console.log(`GET list users`, colors);
            res.render("colors", {colors: "blue"})
        })
        .catch(error => console.error(error));
  };

  fetchColors();

  // res.render("colors", {colors: "blue"})
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})