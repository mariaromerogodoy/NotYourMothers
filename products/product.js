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

    for (let product of data) {
      createCard(product);
    }
  })
  .catch(function (err) {
    console.log("Something went wrong!", err);
  });

// function map(value, low1, high1, low2, high2) {
//   return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
// }

function propertyToImg(text) {
  const dict = {
    wavy: "wavy",
    "curly, wavy": "wavycurl",
    coily: "coily",
    ALL: "all",
    "Leave-In": "leavein",
    "Curl Cream": "cream",
    "Curl Gel": "gel",
    Mousse: "mousse",
    "Volume, Definition": "volDef",
  };
  return dict[text] || text;
}

function createCard(product) {
  const html = `
    <div class="card">
    <p>product: ${product.product}</p>
    <p>category: ${product.category}</p>
    <p>curl: ${product.curl}</p>
    <p>hold: ${product.hold}</p>
    <p>volDef ${product.volDef}:</p>
    <div class="label"> 
          <img class="background" src="../images/${propertyToImg(
            product.curl
          )}.png" />
                     <img class="volDef" src="../images/${propertyToImg(
                       product.volDef
                     )}.png" />
                     <img class="category" src="../images/${propertyToImg(
                       product.category
                     )}.png" />
                     <img class="hold" src="../images/${propertyToImg(
                       product.hold
                     )}.png" />
                     
    </div>
  </div>
    `;
  document.body.innerHTML += html;
}
