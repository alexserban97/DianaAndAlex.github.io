// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed
$(document).ready(function() {
  AOS.init({
    // uncomment below for on-scroll animations to played only once
    // once: true
  }); // initialize animate on scroll library
});

// Smooth scroll for links with hashes
$("a.smooth-scroll").click(function(event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $("html, body").animate(
        {
          scrollTop: target.offset().top
        },
        1000,
        function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) {
            // Checking if the target was focused
            return false;
          } else {
            $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          }
        }
      );
    }
  }
});

// Photo Filter
var activeFilter = "all";

$(".ww-filter-button").on("click", function(e) {
  // remove btn-primary from all buttons first
  $(".ww-filter-button").removeClass("btn-primary");
  $(".ww-filter-button").addClass("btn-outline-primary");

  // add btn-primary to active button
  var button = $(this);
  button.removeClass("btn-outline-primary");
  button.addClass("btn-primary");
  filterItems(button.data("filter"));
  e.preventDefault();
});

function filterItems(filter) {
  if (filter === activeFilter) {
    return;
  }

  activeFilter = filter;
  $(".ww-gallery .card").each(function() {
    var card = $(this);
    var groups = card.data("groups");
    var show = false;
    if (filter === "all") {
      show = true;
    } else {
      for (var i = 0; i < groups.length; i++) {
        if (groups[i] === filter) {
          show = true;
        }
      }
    }
    // hide everything first
    card.fadeOut(400);
    setTimeout(function() {
      if (show && !card.is(":visible")) {
        card.fadeIn(400);
      }
    }, 500);
  });
}

// Light Box
$(document).on("click", '[data-toggle="lightbox"]', function(event) {
  event.preventDefault();
  $(this).ekkoLightbox();
});
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

