$(document).ready(function() {


  const colorArray = []

  const createColorBlock = function(color) {
    const markup = `
      <button class="favColor colorBlock" style=background-color:${color} value=${color} type=submit>${color}</li>
    `
    return markup
  }

  const createColorOptions = function(color) {
    const markup = `
      <button class="colorOption colorBlock" style=background-color:${color} value=${color} type=submit>${color}</li>
    `
    return markup
  }
  

  const renderColors = function(colorArray) {
    $('#favColors').empty()
    let newColor;
    for (let color of colorArray) {
      newColor = createColorBlock(color)
      $('#favColors').prepend(newColor)
    }
  }

  const fetchColors = async () => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);

    const url = `https://www.thecolorapi.com/scheme?hex=${randomColor}&format=json&mode=analogic&count=6`
    
    const newColorObject = {}
    let newOption;
    $('#colorOptions').empty()
    axios.get(url)
        .then(response => {
          let index = 0

          for (let i = 0; i < response.data.colors.length; i++) {
            let newColorArray = Object.values(newColorObject)

            if (!newColorArray.includes(response.data.colors[i].name.closest_named_hex)) {
              newColorObject[index] = response.data.colors[i].name.closest_named_hex
              index++
            }
            newOption = createColorOptions(response.data.colors[i].name.closest_named_hex)
            $('#colorOptions').prepend(newOption)
          }
        })
        .catch(error => console.error(error));
  };


  $(".tryAgain").click(async function() {
    await fetchColors()
  })


  $("#colorOptions").on("click", ".colorOption", function() {
    colorArray.push(this.value)
    renderColors(colorArray)
  })

  $("#favColors").on("click", ".favColor", function() {
    const index = colorArray.indexOf(this.value)
    if (index !== -1) {
      colorArray.splice(index, 1);
    }
    renderColors(colorArray)
  })
  
})