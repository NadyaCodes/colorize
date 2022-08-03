$(document).ready(function() {
  const colorArray = []
  
  const createColorBlock = function(color) {
    const markup = `
      <li class="colorBlock" style=background-color:${color}>${color}</li>
    `
    return markup
  }

  const renderColors = function(colorArray) {
      const newColor = createColorBlock(colorArray[colorArray.length - 1]);
      $('#favColors').prepend(newColor)
  }


  $(".colorBlock").click(function() {
    colorArray.push(this.value)
    renderColors(colorArray)
  })
  
})