const products = [
  {
    name: "Espressor Philips",
    image: "https://via.placeholder.com/250x150",
    description: "Un espressor elegant pentru dimineți perfecte."
  },
  {
    name: "Set farfurii ceramice",
    image: "https://via.placeholder.com/250x150",
    description: "Farfurii artizanale, lucrate manual."
  },
  {
    name: "Cuptor cu microunde Samsung",
    image: "https://via.placeholder.com/250x150",
    description: "Perfect pentru mesele rapide."
  },
  {
    name: "Aspirator vertical Dyson V15 Detect Absolute 2023",
    image: "https://s13emagst.akamaized.net/products/58272/58271891/images/res_7d7f8fd29338bca9a90e40bfc7db43b1.jpg?width=450&height=450&hash=3D9B7C8C4E69C6C5D6A5C4A2D4E9E5D5",
    description: `660W, iluminare laser, ecran LCD, autonomie 60 min – ideal pentru curățenie inteligentă.<br>
    <a href="https://www.emag.ro/aspirator-vertical-dyson-v15-detect-absolute-2023-cu-iluminare-660-w-ecran-lcd-0-77l-autonomie-60-min-galben-nichel-446986-01/pd/DFJLLYYBM/" target="_blank">Vezi produsul pe eMAG</a>`
  }
];

const container = document.getElementById("product-list");
const form = document.getElementById("giftForm");
const selectedGiftInput = document.getElementById("selectedGift");
const statusText = document.getElementById("status");

products.forEach(product => {
  const div = document.createElement("div");
  div.className = "product";
  div.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>${product.description}</p>
    <button onclick="selectGift('${product.name}')">Rezervă acest cadou</button>
  `;
  container.appendChild(div);
});

function selectGift(name) {
  selectedGiftInput.value = name;
  form.style.display = "block";
  form.scrollIntoView({ behavior: "smooth" });
}

form.addEventListener("submit", async function(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  const response = await fetch("https://script.google.com/macros/s/AKfycbzc8yMc65PPSJY4JJIWL_Qqu3Tzij-Qtp2I4dxspotIcpZ3hZ6EsmNqfWqK4clzlerM/exec", {
    method: "POST",
    body: new URLSearchParams(data)
  });

  if (response.ok) {
    statusText.innerText = "Cadoul a fost rezervat cu succes! Verifică emailul pentru confirmare.";
    form.reset();
    form.style.display = "none";
  } else {
    statusText.innerText = "A apărut o eroare. Încearcă din nou.";
  }
});
