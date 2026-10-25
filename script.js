/* ============================================================
   EDIT ME: site settings
   ------------------------------------------------------------
   CONTACT_EMAIL: where the "Email Joseph" button goes.
   Each product lists its `options`: one per version in the shop,
   each with a short label and the product page url.
   `price` has one entry per currency: visitors in the Americas
   see USD, everyone else sees GBP. Leave `price` out to hide it.
   `photo` is an optional product photo in the photos/ folder; when
   it's set it replaces the drawn mock-up.
   ============================================================ */
const CONTACT_EMAIL = "notthatjoe@outlook.com";
const SHOP_URL = "https://notthatjoe-shop.fourthwall.com/";
const P = SHOP_URL + "products/";

const PRODUCTS = [
  {
    tag: "Best seller",
    name: "“Not That Joe” tee",
    blurb: "For everyone who typed the name, hit enter and got a doctor.",
    price: { GBP: "about £19", USD: "$25" },
    photo: "photos/tee-not-that-joe.jpg",
    options: [
      { label: "Yellow lettering", url: P + "not-that-joe-yellow-text" },
      { label: "Navy lettering", url: P + "not-that-joe-navy-text" },
    ],
    art: { kind: "tee", colour: "#ffcd4a", lines: ["NOT", "THAT", "JOE"], ink: "#182a58" },
  },
  {
    tag: "New",
    name: "“Wrong Joe, Right Doctor” tee",
    blurb: "The one that explains everything.",
    price: { GBP: "about £17", USD: "$22" },
    photo: "photos/tee-wrong-joe-right-doctor.jpg",
    options: [
      { label: "Black, blue, red & more", url: P + "wrong-joe-right-doctor" },
      { label: "Yellow", url: P + "wrong-joe-right-doctor-blue" },
    ],
    art: { kind: "tee", colour: "#2b55b8", lines: ["WRONG JOE", "RIGHT", "DOCTOR"], ink: "#f2f3f8" },
  },
  {
    tag: "Night shift",
    name: "“Not That Joe” mug",
    blurb: "Holds enough tea to get through a night on the wards.",
    price: { GBP: "about £11", USD: "$14" },
    photo: "photos/mug-not-that-joe.jpg",
    options: [
      { label: "Pink lettering", url: P + "not-that-joe-mug-pink-lettering" },
      { label: "Navy lettering", url: P + "not-that-joe-mug-navy-lettering" },
      { label: "Yellow lettering", url: P + "not-that-joe-mug-yellow-lettering" },
    ],
    art: { kind: "mug", colour: "#f2f3f8", lines: ["NOT", "THAT JOE"], ink: "#c8004f" },
  },
  {
    tag: "Night shift",
    name: "“Wrong Joe, Right Doctor” mug",
    blurb: "The whole mix-up, explained over a brew.",
    price: { GBP: "about £11", USD: "$14" },
    photo: "photos/mug-wrong-joe-right-doctor.jpg",
    options: [
      { label: "Navy lettering", url: P + "wrong-joe-right-doctor-mug-navy-lettering" },
      { label: "Yellow lettering", url: P + "wrong-joe-right-doctor-mug-yellow-lettering" },
    ],
    art: { kind: "mug", colour: "#ff4f86", lines: ["WRONG JOE", "RIGHT DOCTOR"], ink: "#182a58" },
  },
  {
    tag: "Desk",
    name: "“Wrong Joe, Right Doctor” mouse pad",
    blurb: "For writing up notes, or for Googling the other Joe.",
    price: { GBP: "about £9", USD: "$12.13" },
    photo: "photos/mouse-pad.jpg",
    options: [
      { label: "Buy now", url: P + "mouse-pad-wrong-joe-right-doctor" },
    ],
    art: { kind: "pad", colour: "#182a58", lines: ["WRONG JOE", "RIGHT DOCTOR"], ink: "#ffcd4a" },
  },
];

/* ---------- Product artwork (simple SVG mock-ups) ---------- */
function textLines(lines, ink, x, y, size, gap) {
  return lines
    .map((t, i) => `<text x="${x}" y="${y + i * gap}" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="${size}" fill="${ink}">${t}</text>`)
    .join("");
}

function vinyl(cx, cy, r) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#1d1f26"/>
    <circle cx="${cx}" cy="${cy}" r="${r * 0.75}" fill="none" stroke="#2a2d36" stroke-width="1.5"/>
    <circle cx="${cx}" cy="${cy}" r="${r * 0.55}" fill="none" stroke="#2a2d36" stroke-width="1.5"/>
    <circle cx="${cx}" cy="${cy}" r="${r * 0.35}" fill="#ff4f86"/>`;
}

function artSVG({ kind, colour, lines, ink }) {
  const open = `<svg viewBox="0 0 200 200" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">`;
  if (kind === "tee") {
    const size = lines.some((l) => l.length > 6) ? 17 : 24;
    return `${open}
      <path d="M62 30 L85 22 Q100 34 115 22 L138 30 L172 56 L156 82 L140 72 L140 178 L60 178 L60 72 L44 82 L28 56 Z" fill="${colour}" stroke="rgba(0,0,0,.15)" stroke-width="2"/>
      ${textLines(lines, ink, 100, 82, size, size + 4)}
      ${vinyl(100, 152, 13)}
    </svg>`;
  }
  if (kind === "mug") {
    const size = lines.some((l) => l.length > 8) ? 15 : 22;
    return `${open}
      <path d="M140 75 h16 a22 22 0 0 1 0 44 h-16" fill="none" stroke="${colour}" stroke-width="10"/>
      <rect x="44" y="52" width="100" height="112" rx="10" fill="${colour}"/>
      ${textLines(lines, ink, 94, 96, size, size + 6)}
      ${vinyl(94, 140, 11)}
    </svg>`;
  }
  // mouse pad
  return `${open}
    <rect x="20" y="45" width="160" height="110" rx="14" fill="${colour}" stroke="#2f4579" stroke-width="3"/>
    ${textLines(lines, ink, 100, 92, 18, 22)}
    ${vinyl(100, 132, 11)}
  </svg>`;
}

/* ---------- Render the shop ---------- */
function visitorCurrency() {
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (zone.startsWith("America/")) return "USD";
  } catch (e) { /* fall through */ }
  return "GBP";
}

function renderMerch() {
  const grid = document.getElementById("merch-grid");
  if (!grid) return;
  const currency = visitorCurrency();

  grid.innerHTML = PRODUCTS.map((p) => {
    const price = p.price ? `<span class="product__price">${p.price[currency] || p.price.GBP}</span>` : "";
    const single = p.options.length === 1;
    const buttons = p.options
      .map((o) => `<a class="btn ${single ? "btn--yellow" : "btn--option"}" href="${o.url}" target="_blank" rel="noopener">${o.label}</a>`)
      .join("");
    return `<article class="product">
      <div class="product__art${p.photo ? " product__art--photo" : ""}">${p.photo ? `<img src="${p.photo}" alt="${p.name}" loading="lazy">` : artSVG(p.art)}</div>
      <div class="product__body">
        <span class="product__tag">${p.tag}</span>
        <h3>${p.name}</h3>
        <p>${p.blurb}</p>
        <div class="product__foot">
          ${price}
          ${single ? "" : `<span class="product__pick">Choose a version:</span>`}
          <div class="product__options">${buttons}</div>
        </div>
      </div>
    </article>`;
  }).join("");

  const all = document.getElementById("shop-all");
  if (all && SHOP_URL) { all.href = SHOP_URL; all.hidden = false; }
}

/* ---------- Contact + footer ---------- */
function setupContact() {
  const link = document.getElementById("contact-link");
  if (!link) return;
  if (CONTACT_EMAIL) {
    link.href = `mailto:${CONTACT_EMAIL}`;
  } else {
    link.closest("section").hidden = true;
    document.querySelector('.nav__links a[href="#contact"]')?.parentElement.remove();
  }
}

document.getElementById("year").textContent = new Date().getFullYear();
renderMerch();
setupContact();
