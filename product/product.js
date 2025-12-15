const container = document.getElementById("container");

const spreadsheetID = "168pOpWYZ4MBvbZJRitqZOy-_Ok0Hcf2AYqhGGjcQK0I";
const tabName = "Sheet1";
const opensheetURI = `https://opensheet.elk.sh/${spreadsheetID}/${tabName}`;

function propertyToImg(raw) {
  if (!raw) return "";

  const text = String(raw).trim();

  const dict = {
    wavy: "wavy",
    "Wavy Curly": "wavycurl",
    coily: "coily",
    "Curly Coily": "curlcoil",
    ALL: "all",
    All: "all",

    "Leave-In": "leavein",
    "Curl Cream": "cream",
    "Curl Gel": "gel",
    Mousse: "mousse",

    "Volume, Definition": "voldef",
    Volume: "volume",
    Definition: "definition",

    light: "light",
    medium: "medium",
    strong: "strong",
    Light: "light",
    Medium: "medium",
    Strong: "strong",
  };

  return dict[text] || text.toLowerCase().replace(/\s+/g, "");
}

function curlToOverlayImg(curlRaw) {
  const base = propertyToImg(curlRaw);
  return base ? `${base}1` : "";
}

function imgTag({ className, fileBase, isBackground = false }) {
  if (!fileBase) return "";

  const src = `../images/${fileBase}.png`;
  if (isBackground) {
    return `<img class="background" src="${src}" alt="" />`;
  }
  return `<img class="${className} overlay" src="${src}" alt="" />`;
}

function createCard(product) {
  const curlBase = propertyToImg(product.Curl);
  const curlOverlay = curlToOverlayImg(product.Curl);

  const volDef = propertyToImg(product.volDef);
  const category = propertyToImg(product.Category);
  const hold = propertyToImg(product.Hold);

  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <p>Product: ${product.Product ?? ""}</p>
    <p>Category: ${product.Category ?? ""}</p>
    <p>Curl: ${product.Curl ?? ""}</p>
    <p>Hold: ${product.Hold ?? ""}</p>
    <p>Volume Definition: ${product.volDef ?? ""}</p>

    <div class="label">
      ${imgTag({ fileBase: curlBase, isBackground: true })}
      ${imgTag({ className: "curlOverlay", fileBase: curlOverlay })}
      ${imgTag({ className: "volDef", fileBase: volDef })}
      ${imgTag({ className: "category", fileBase: category })}
      ${imgTag({ className: "hold", fileBase: hold })}
    </div>
  `;

  container.appendChild(card);
}

async function init() {
  try {
    const res = await fetch(opensheetURI);
    const data = await res.json();

    container.innerHTML = "";

    data.forEach(createCard);
  } catch (err) {
    console.log("Something went wrong!", err);
  }
}

init();
