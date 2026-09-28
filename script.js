(() => {
  const { whatsapp, productos, categorias } = CONFIG;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const precio = (n) => (n > 0 ? "$" + n.toLocaleString("es-AR") : "Consultar");
  const waUrl = (text) =>
    `https://wa.me/${whatsapp}` + (text ? `?text=${encodeURIComponent(text)}` : "");

  // Datos de contacto y enlaces de WhatsApp
  $$("[data-cfg]").forEach((el) => (el.textContent = CONFIG[el.dataset.cfg]));
  $$("[data-wa]").forEach((el) => {
    el.href = waUrl("¡Hola Congelados JEMY! Quiero hacer una consulta.");
    el.target = "_blank";
    el.rel = "noopener";
    if (el.hasAttribute("data-wa-text")) el.textContent = "+" + whatsapp;
  });
  $("#year").textContent = new Date().getFullYear();

  // Menú móvil
  const toggle = $(".nav__toggle");
  toggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", open);
  });
  $$(".nav__links a").forEach((a) =>
    a.addEventListener("click", () => document.body.classList.remove("menu-open"))
  );

  // Catálogo
  const cart = new Map(); // índice de producto -> cantidad
  let filtro = "Todos";

  const filters = $(".filters");
  ["Todos", ...categorias].forEach((cat) => {
    const b = document.createElement("button");
    b.textContent = cat;
    b.className = "chip" + (cat === filtro ? " is-active" : "");
    b.addEventListener("click", () => {
      filtro = cat;
      $$(".chip").forEach((c) => c.classList.toggle("is-active", c === b));
      renderGrid();
    });
    filters.appendChild(b);
  });

  function renderGrid() {
    const grid = $("#grid");
    grid.innerHTML = "";
    productos.forEach((p, i) => {
      if (filtro !== "Todos" && p.categoria !== filtro) return;
      const qty = cart.get(i) || 0;
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <div class="card__img">${p.emoji || "❄️"}</div>
        <div class="card__body">
          <span class="card__cat">${p.categoria}</span>
          <h3>${p.nombre}</h3>
          <p class="card__price">${precio(p.precio)} <small>/ ${p.unidad}</small></p>
          <div class="qty">
            <button aria-label="Quitar" data-d="-1">−</button>
            <span>${qty}</span>
            <button aria-label="Agregar" data-d="1">+</button>
          </div>
        </div>`;
      $$("button", card).forEach((b) =>
        b.addEventListener("click", () => change(i, +b.dataset.d))
      );
      grid.appendChild(card);
    });
  }

  function change(i, d) {
    const q = Math.max(0, (cart.get(i) || 0) + d);
    q ? cart.set(i, q) : cart.delete(i);
    renderGrid();
    renderCart();
  }

  // Carrito
  function renderCart() {
    const list = $(".cart__items");
    list.innerHTML = "";
    let total = 0, count = 0, sinPrecio = false;
    cart.forEach((q, i) => {
      const p = productos[i];
      count += q;
      p.precio > 0 ? (total += p.precio * q) : (sinPrecio = true);
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${p.emoji || "❄️"} ${p.nombre}</span>
        <div class="qty qty--sm">
          <button data-d="-1" aria-label="Quitar">−</button><span>${q}</span><button data-d="1" aria-label="Agregar">+</button>
        </div>`;
      $$("button", li).forEach((b) =>
        b.addEventListener("click", () => change(i, +b.dataset.d))
      );
      list.appendChild(li);
    });
    $(".cart-fab__count").textContent = count;
    $(".cart-fab").classList.toggle("has-items", count > 0);
    $(".cart__empty").hidden = count > 0;
    $(".cart__foot").hidden = count === 0;
    $(".cart__total strong").textContent =
      (total ? precio(total) : "A confirmar") + (total && sinPrecio ? " + a confirmar" : "");
  }

  const openCart = (v) => document.body.classList.toggle("cart-open", v);
  $(".cart-fab").addEventListener("click", () => openCart(true));
  $(".cart__close").addEventListener("click", () => openCart(false));
  $(".overlay").addEventListener("click", () => {
    openCart(false);
    document.body.classList.remove("menu-open");
  });

  $("#enviar-pedido").addEventListener("click", () => {
    const nombre = $("#cliente-nombre").value.trim();
    const dir = $("#cliente-dir").value.trim();
    const lineas = [...cart].map(
      ([i, q]) => `• ${q} x ${productos[i].nombre} (${productos[i].unidad})`
    );
    const msg = ["¡Hola Congelados JEMY! Quiero hacer este pedido:", "", ...lineas];
    if (nombre || dir) msg.push("");
    if (nombre) msg.push(`Nombre: ${nombre}`);
    if (dir) msg.push(`Dirección: ${dir}`);
    window.open(waUrl(msg.join("\n")), "_blank", "noopener");
  });

  renderGrid();
  renderCart();
})();
