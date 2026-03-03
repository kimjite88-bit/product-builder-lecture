class LottoNumbers extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render(Array(6).fill("?")); // Show 6 '?'s initially
  }

  render(numbers = Array(6).fill("?")) {
    const a = Math.floor(Math.random() * (250 - 200) + 200);
    const b = Math.floor(Math.random() * (120 - 50) + 50);
    const c = Math.floor(Math.random() * (255 - 200) + 200);

    this.shadowRoot.innerHTML = `
      <style>
        :host { display:flex; gap:1rem; }
        .number{
          width:50px; height:50px; border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          font-size:1.5rem; font-weight:bold; color:#fff;
          background-color: rgb(${a}, ${b}, ${c});
          box-shadow: 0 4px 8px rgba(0,0,0,.2);
          transition: all .3s ease;
        }
        .number:hover{ transform: scale(1.1); }
      </style>
      ${numbers.map(n => `<div class="number">${n}</div>`).join("")}
    `;
  }
}

customElements.define("lotto-numbers", LottoNumbers);

// Connect button after HTML is fully parsed (this is key)
window.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("generate-btn");
  const lottoEl = document.querySelector("lotto-numbers");
  const themeToggle = document.getElementById("theme-toggle");

  if (!btn) {
    console.error("Button with id='generate-btn' not found. Check index.html");
    return;
  }
  if (!lottoEl) {
    console.error("<lotto-numbers> tag not found. Check index.html");
    return;
  }

  btn.addEventListener("click", () => {
    const set = new Set();
    while (set.size < 6) set.add(Math.floor(Math.random() * 45) + 1);
    const numbers = [...set].sort((a, b) => a - b);
    lottoEl.render(numbers);
  });

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "dark") {
        document.documentElement.removeAttribute("data-theme");
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
    }
  });
});
