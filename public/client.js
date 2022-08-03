// import axios from 'axios';

$(document).ready(function() {


  const colorArray = []

  const createColorBlock = function(color) {
    const markup = `
      <button class="favColor colorBlock" style=background-color:${color} value=${color} type=submit>${color}</li>
    `
    return markup
  }

  // button.colorBlock.colorOption(type="submit" value=`${val}` style=`background-color: ${colors[key]}`)=val

  const renderColors = function(colorArray) {
    $('#favColors').empty()
    let newColor;
    for (let color of colorArray) {
      newColor = createColorBlock(color)
      $('#favColors').prepend(newColor)
    }
      // const newColor = createColorBlock(colorArray[colorArray.length - 1]);
      // $('#favColors').prepend(newColor)
  }


  // const favObject = {'0': '#FF5733'}
  const fetchColors = () => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);

    const url = `https://www.thecolorapi.com/scheme?hex=${randomColor}&format=json&mode=analogic&count=6`
    
    colorObject = {}
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
            res.render("colors", {colors: colorObject})
        })
        .catch(error => console.error(error));
  };

  // fetchColors();

  $(".tryAgain").click(function() {
    alert("trying Again")
    fetchColors()
  })


  $(".colorOption").click(function() {
    colorArray.push(this.value)
    renderColors(colorArray)
  })
  // document.querySelector("#favColors > li")

  // #favColors > li:nth-child(2)
  
  $(".favColor").click(function() {
    alert("Hi!")
    console.log(this.value)
    const index = colorArray.indexOf(this.value)
    // // colorArray.push(this.value)
    if (index !== -1) {
      colorArray.splice(index, 1);
    }
    console.log(colorArray)
    renderColors(colorArray)
    // $(".favColor").filter(`:contains(${this.value})`).remove();
  })
  
})