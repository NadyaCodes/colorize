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
          const colorObject = {}
          let index = 0

          for (let i = 0; i < response.data.colors.length; i++) {
            let colorArray = Object.values(colorObject)

            if (!colorArray.includes(response.data.colors[i].name.closest_named_hex)) {
              colorObject[index] = response.data.colors[i].name.closest_named_hex
              index++
            }
          }

          console.log(colorObject, "colorObject")
            res.render("colors", {colors: colorObject})
        })
        .catch(error => console.error(error));
  };

  fetchColors();

  // res.render("colors", {colors: "blue"})
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})