let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    console.log(
      "Window resized to:",
      window.innerWidth,
      "x",
      window.innerHeight
    );
  }, 200);
});

const container = document.getElementById("container");

const spreadsheetID = `168pOpWYZ4MBvbZJRitqZOy-_Ok0Hcf2AYqhGGjcQK0I`;
let tabName = "Sheet1";

// format them into Ben's uri
let opensheet_uri = `https://opensheet.elk.sh/${spreadsheetID}/${tabName}`;

console.log(opensheet_uri);

// Object

// category: "Curl Gel"

// curl: "curly, wavy"

// hold: "medium"

// product: "seven-(STYLER JELLY MEDIUM HOLD↵FRIZZ RESCUE CURL RETAINER)"

// volDef: "Definition"

// Object Prototype

fetch(opensheet_uri)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

    for (let dog of data) {
      let newDogDiv = document.createElement("DIV");
      newDogDiv.classList.add("dog");
      container.appendChild(newDogDiv);

      const color = dog.Color;
      const clothing = dog.Clothing;
      const size = parseFloat(dog.Size);
      const rarity = parseInt(dog.Rarity);
      const friendliness = parseInt(dog.Friendliness);

      const divSize = map(size, 1, 5, 50, 200);
      const divRoundness = map(friendliness, 1, 5, 0, 50);

      newDogDiv.style.background = color;
      newDogDiv.style.width = divSize + "px";
      newDogDiv.style.height = divSize + "px";
      newDogDiv.style.borderRadius = divRoundness + "%";

      for (let i = 0; i < rarity; i++) {
        let newRarityDiv = document.createElement("DIV");
        newRarityDiv.classList.add("raritySquare");
        newRarityDiv.style.background = color;
        newRarityDiv.style.borderRadius = divRoundness + "%";
        newRarityDiv.style.transform = `translate(-50%, -50%) rotate(${
          Math.random() * 360
        }deg)`;
        newDogDiv.appendChild(newRarityDiv);
      }

      if (clothing == "curltype") {
        let bootImg = document.createElement("IMG");
        bootImg.classList.add("curltype");
        bootImg.src = "../images/curly.png";
        newDogDiv.appendChild(bootImg);
      }

      if (clothing == "step") {
        let newImg = document.createElement("IMG");
        newImg.classList.add("step");
        newImg.src = "../images/volume.png";
        newDogDiv.appendChild(newImg);
      }

      if (clothing == "category") {
        let newImg = document.createElement("IMG");
        newImg.classList.add("category");
        newImg.src = "../images/gel.png";
        newDogDiv.appendChild(newImg);
      }

      if (clothing == "hold") {
        let newImg = document.createElement("IMG");
        newImg.classList.add("hold");
        newImg.src = "../images/light.png";
        newDogDiv.appendChild(newImg);
      }
    }
  })
  .catch(function (err) {
    console.log("Something went wrong!", err);
  });

function map(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

const curlButtons = document.getElementsByClassName("curl");
console.log(curlButtons);

for (const button of curlButtons) {
  button.addEventListener("click", function (event) {
    const base = document.getElementById("wavyImg"); // wavy/curly/coily base
    const overlay = document.getElementById("wavy1Img"); // wavy1/curly1/coily1 overlay

    const name = event.target.dataset.img; // ex: "curly", "coily", "all"

    base.src = `../images/${name}.png`;
    overlay.src = `../images/${name}1.png`; // ex: "curly1.png", "coily1.png"

    for (const b of curlButtons) b.classList.remove("clicked");
    event.target.classList.add("clicked");
  });
}

for (const button of curlButtons) {
  button.addEventListener("click", function (event) {
    console.log(event.target.dataset.img);
    const img = document.getElementById("wavyImg");
    img.src = `../images/${event.target.dataset.img}.png`;

    // reapeat 105/106 but do it for the background img
    for (const button of curlButtons) {
      button.classList.remove("clicked");
    }
    event.target.classList.add("clicked");
  });
}

const productButtons = document.getElementsByClassName("product");
console.log(productButtons);

for (const button of productButtons) {
  button.addEventListener("click", function (event) {
    console.log(event.target.dataset.img);
    const img = document.getElementById("productImg");
    img.src = `../images/${event.target.dataset.img}.png`;
    for (const button of productButtons) {
      button.classList.remove("clicked");
    }
    event.target.classList.add("clicked");
  });
}

const volumeButtons = document.getElementsByClassName("volume");
console.log(volumeButtons);

for (const button of volumeButtons) {
  button.addEventListener("click", function (event) {
    console.log(event.target.dataset.img);
    const img = document.getElementById("volumeImg");
    img.src = `../images/${event.target.dataset.img}.png`;
    for (const button of volumeButtons) {
      button.classList.remove("clicked");
    }
    event.target.classList.add("clicked");
  });
}

const holdButtons = document.getElementsByClassName("hold");
console.log(holdButtons);

for (const button of holdButtons) {
  button.addEventListener("click", function (event) {
    console.log(event.target.dataset.img);
    const img = document.getElementById("lightImg");
    img.src = `../images/${event.target.dataset.img}.png`;
    for (const button of holdButtons) {
      button.classList.remove("clicked");
    }
    event.target.classList.add("clicked");
  });
}
