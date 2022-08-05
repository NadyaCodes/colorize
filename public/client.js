$(document).ready(function () {
  const colorArray = [];

  const createColorBlock = function (color) {
    const markup = `
      <li><button class="favColor colorBlock" style=background-color:${color} value=${color} type=submit>${color}</button>Hex code: ${color}</li>
    `;
    return markup;
  };

  const createColorOptions = function (color) {
    const markup = `
      <button class="colorOption colorBlock" style=background-color:${color} value=${color} type=submit>${color}</li>
    `;
    return markup;
  };

  const renderColors = function (colorArray) {
    $("#favColors").empty();
    let newColor;
    for (let color of colorArray) {
      newColor = createColorBlock(color);
      $("#favColors").prepend(newColor);
    }
  };

  const fetchColors = async () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);

    const url = `https://www.thecolorapi.com/scheme?hex=${randomColor}&format=json&mode=analogic&count=6`;

    const newColorObject = {};
    let newOption;
    $("#colorOptions").empty();
    axios
      .get(url)
      .then((response) => {
        let index = 0;

        for (let i = 0; i < response.data.colors.length; i++) {
          let newColorArray = Object.values(newColorObject);

          if (
            !newColorArray.includes(
              response.data.colors[i].name.closest_named_hex
            )
          ) {
            newColorObject[index] =
              response.data.colors[i].name.closest_named_hex;
            newOption = createColorOptions(newColorObject[index]);
            $("#colorOptions").prepend(newOption);
            index++;
          }
        }
      })
      .catch((error) => console.error(error));
  };

  $(".tryAgain").click(async function () {
    await fetchColors();
  });

  $("#colorOptions").on("click", ".colorOption", function () {
    colorArray.push(this.value);
    renderColors(colorArray);
  });

  $("#colorOptions").on(
    {
      mouseenter: function () {
        $(this).text("");
        $(this).append("<span><i class='fa-solid fa-heart'></i></span>");
      },
      mouseleave: function () {
        $(this).find("span").last().remove();
        $(this).text(this.value);
      },
    },
    ".colorOption"
  );

  $("#favColors").on("click", ".favColor", function () {
    const index = colorArray.indexOf(this.value);
    if (index !== -1) {
      colorArray.splice(index, 1);
    }
    renderColors(colorArray);
  });

  $("#favColors").on(
    {
      mouseenter: function () {
        $(this).text("");
        $(this).append("<span><i class='fa-solid fa-trash'></i></span>");
      },
      mouseleave: function () {
        $(this).find("span").last().remove();
        $(this).text(this.value);
      },
    },
    ".favColor"
  );

  function download(filename, text) {
    let element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  $("#downloadColors").click(function () {
    let colorString = "";

    for (let i = 0; i < colorArray.length; i++) {
      colorString += `Color ${i + 1}: ${colorArray[i]} \n`;
    }

    download("colors.txt", colorString);
  });
});
