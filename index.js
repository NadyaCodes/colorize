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
  
  const colorObject = {}
  const favsArray = []
  // const favObject = {'0': '#FF5733'}
  const fetchColors = () => {
    axios.get(url)
        .then(response => {

          let index = 0

          for (let i = 0; i < response.data.colors.length; i++) {
            let colorArray = Object.values(colorObject)

            if (!colorArray.includes(response.data.colors[i].name.closest_named_hex)) {
              colorObject[index] = response.data.colors[i].name.closest_named_hex
              index++
            }
          }
          console.log(colorObject, "colorObject")
            res.render("colors", {colors: colorObject, favs: favsArray})
        })
        .catch(error => console.error(error));
  };

  fetchColors();
  // res.render("colors")
})


// const button = document.getElementById('colorBtn');
// button.addEventListener('click', console.log("clicked"))
// button.addEventListener('click', async _ => {
//   try {     
//     const response = await fetch('/colors', {
//       method: 'post',
//       body: {
//         color: "blue"
//       }
//     });
//     console.log('Completed!', response);
//   } catch(err) {
//     console.error(`Error: ${err}`);
//   }
// });

// app.post("/colors", function (req, res) {
//   console.log("HI")
//   // console.log("req", req)
//   console.log("res", res)
//   // res.render('colors', {
//   //   colors: colorObject, favs: favObject
//   // }).catch(error => console.error(error));
// })

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})