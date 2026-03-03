class LottoNumbers extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render(Array(6).fill("?")); // Show 6 '?'s initially
  }

  render(numbers = Array(6).fill("?")) {
    const a = Math.floor(Math.random() * (200 - 100) + 100);
    const b = Math.floor(Math.random() * (150 - 50) + 50);
    const c = Math.floor(Math.random() * (220 - 180) + 180);

    this.shadowRoot.innerHTML = `
      <style>
        :host { display:flex; gap:1rem; }
        .number{
          width:45px; height:45px; border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          font-size:1.3rem; font-weight:bold; color:#fff;
          background: linear-gradient(145deg, rgba(${a},${b},${c},1) 0%, rgba(${a-20},${b-20},${c-20},1) 100%);
          box-shadow: 0 4px 8px rgba(0,0,0,.2);
          transition: all .3s ease;
        }
        .number:hover{ transform: translateY(-5px); }
      </style>
      ${numbers.map(n => `<div class="number">${n}</div>`).join("")}
    `;
  }
}

customElements.define("lotto-numbers", LottoNumbers);

window.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("generate-btn");
  const lottoEl = document.querySelector("lotto-numbers");
  const themeToggle = document.getElementById("theme-toggle");

  if (!btn || !lottoEl || !themeToggle) {
    console.error("Required element not found. Check index.html");
    return;
  }

  btn.addEventListener("click", () => {
    const set = new Set();
    while (set.size < 6) set.add(Math.floor(Math.random() * 45) + 1);
    const numbers = [...set].sort((a, b) => a - b);
    lottoEl.render(numbers);
  });

  // Theme toggling logic
  themeToggle.addEventListener("click", () => {
    const doc = document.documentElement;
    const currentTheme = doc.getAttribute("data-theme");
    if (currentTheme === "light") {
        doc.removeAttribute("data-theme");
        themeToggle.textContent = "Light Mode";
    } else {
        doc.setAttribute("data-theme", "light");
        themeToggle.textContent = "Dark Mode";
    }
  });

  // Set initial theme button text
  if (document.documentElement.getAttribute("data-theme") === "light") {
      themeToggle.textContent = "Dark Mode";
  } else {
      themeToggle.textContent = "Light Mode";
  }
});
