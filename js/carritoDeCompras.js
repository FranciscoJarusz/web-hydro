document.addEventListener("DOMContentLoaded", function () {
  const botonAgregar = document.querySelector(".boton-agregar");
  const menuCarrito = document.getElementById("menuCarrito");
  const overlay = document.getElementById("overlayBlur");
  const carritoIcon = document.querySelector(".carro-compra");

  let costoEnvio = 0;

  carritoIcon.addEventListener("click", () => {
    localStorage.removeItem("envio");
    costoEnvio = 0;

    menuCarrito.classList.add("activo");
    overlay.classList.add("activo");
    actualizarCarritoUI();
  });

  overlay.addEventListener("click", () => {
    menuCarrito.classList.remove("activo");
    overlay.classList.remove("activo");
  });

  if (botonAgregar) {
    botonAgregar.addEventListener("click", () => {
      const textoOriginal = botonAgregar.textContent;
      botonAgregar.textContent = "Agregando...";
      botonAgregar.disabled = true;

      try {
        const nombre = document.querySelector(".producto-titulo").textContent.trim();
        const precioTexto = document.querySelector(".producto-precio").textContent.trim();
        const precio = parseFloat(precioTexto.replace(/\$/g, '').replace(/\./g, '').replace(',', '.'));
        const imagen = document.querySelector(".imagen-producto")?.getAttribute("src") || "";
        const talleActivo = document.querySelector(".boton-talle.activo");
        const cantidad = parseInt(document.getElementById("cantidad").textContent);

        if (!talleActivo) {
          alert("Por favor, seleccioná un talle.");
          return;
        }

        const talle = talleActivo.textContent;
        const carrito = obtenerCarrito();
        const existente = carrito.find(item => item.nombre === nombre && item.talle === talle);

        if (existente) {
          existente.cantidad += cantidad;
        } else {
          carrito.push({ nombre, precio, imagen, talle, cantidad });
        }

        guardarCarrito(carrito);
        actualizarCarritoUI();
        actualizarContadorCarrito();

      } finally {
        setTimeout(() => {
          botonAgregar.textContent = textoOriginal;
          botonAgregar.disabled = false;
          mostrarToast("Producto agregado al carrito");
        }, 1000);
      }
    });
  }

  function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
  }

  function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  window.eliminarItemDelCarrito = function (index) {
    const carrito = obtenerCarrito();
    carrito.splice(index, 1);
    guardarCarrito(carrito);
    actualizarCarritoUI();
    actualizarContadorCarrito();
  };

  window.sumarCantidad = function (index) {
    const carrito = obtenerCarrito();
    carrito[index].cantidad++;
    guardarCarrito(carrito);
    actualizarCarritoUI();
    actualizarContadorCarrito();
  };

  window.restarCantidad = function (index) {
    const carrito = obtenerCarrito();
    if (carrito[index].cantidad > 1) {
      carrito[index].cantidad--;
    } else {
      carrito.splice(index, 1);
    }
    guardarCarrito(carrito);
    actualizarCarritoUI();
    actualizarContadorCarrito();
  };

  function calcularPrecioEnvio(cp) {
    const cpNum = parseInt(cp);
    if (cpNum >= 1000 && cpNum < 2000) return 0;
    if (cpNum >= 2000 && cpNum < 6000) return 1500;
    if (cpNum >= 6000 && cpNum <= 9999) return 2500;
    return 3000;
  }

  function actualizarCarritoUI() {
    const carrito = obtenerCarrito();
    menuCarrito.innerHTML = `
      <div class="carrito-header">
        <span class="carrito-titulo">Carrito de compras.</span>
      </div>
    `;

    if (carrito.length === 0) {
      menuCarrito.innerHTML += '<span class="carrito-vacio">El carrito está vacío.</span>';
      return;
    }

    let total = 0;

    carrito.forEach((item, index) => {
      const subtotal = item.precio * item.cantidad;
      total += subtotal;

      menuCarrito.innerHTML += `
        <div class="item-carrito">
          <div class="item-contenedor">
            <img src="${item.imagen}" alt="${item.nombre}">
            <div class="item-info">
              <p class="item-nombre">${item.nombre} <span class="item-talle">(Talle ${item.talle})</span></p>
              <div class="item-cantidad-controles">
                <button class="cantidad-btn" onclick="restarCantidad(${index})">−</button>
                <span class="cantidad">${item.cantidad}</span>
                <button class="cantidad-btn" onclick="sumarCantidad(${index})">+</button>
              </div>
            </div>
            <div class="item-precio-info">
              <button class="btn-eliminar" onclick="eliminarItemDelCarrito(${index})">Eliminar</button>
              <p class="item-subtotal">Subtotal: $${subtotal.toLocaleString('es-AR')}</p>
            </div>
          </div>
        </div>
      `;
    });

    menuCarrito.innerHTML += `
      <div class="subtotal-carrito">
        <span>Subtotal (sin envío):</span>
        <strong class="subitem-subtotal">$${total.toLocaleString('es-AR')}</strong>
      </div>

      <div class="envio-contenedor">
        <span class="envio-texto">Medios de envío</span>
        <div class="envio-campo">
          <input class="codigoPostal" type="text" id="codigoPostal" placeholder="Tu código postal">
          <button class="calcularEnvio-btn" id="calcularEnvio">Calcular</button>
        </div>
        <div class="mensaje-envio" id="mensajeEnvio"></div>
      </div>

      <div class="total-final-contenedor">
        <span class="total-final-texto">Total (con envío):</span>
        <strong id="totalFinalTexto">$${(total + costoEnvio).toLocaleString('es-AR')}</strong>
      </div>
    `;

    const btnCalcular = document.getElementById("calcularEnvio");
    const inputCP = document.getElementById("codigoPostal");
    const mensaje = document.getElementById("mensajeEnvio");
    const totalTexto = document.getElementById("totalFinalTexto");

    if (btnCalcular) {
      btnCalcular.addEventListener("click", () => {
        const cp = inputCP.value.trim();

        if (!/^\d{4,5}$/.test(cp)) {
          mensaje.textContent = "Ingresá un código postal válido.";
          return;
        }

        const nuevoEnvio = calcularPrecioEnvio(cp);
        localStorage.setItem("envio", nuevoEnvio);
        costoEnvio = nuevoEnvio;

        mensaje.innerHTML = `
          <span>Costo de envío:</span>
          <strong>$${nuevoEnvio.toLocaleString('es-AR')}</strong>
        `;
        totalTexto.textContent = `Total: $${(total + nuevoEnvio).toLocaleString('es-AR')}`;
      });
    }

    actualizarContadorCarrito();

  }

  function mostrarToast(mensaje) {
    const toast = document.getElementById("toast");
    toast.textContent = mensaje;
    toast.classList.add("mostrar");
    setTimeout(() => {
      toast.classList.remove("mostrar");
    }, 2500);
  }

  function actualizarContadorCarrito() {
    const carrito = obtenerCarrito();
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const contador = document.getElementById("contadorCarrito");

    if (totalCantidad > 0) {
      contador.textContent = totalCantidad;
      contador.style.display = "inline-block";
    } else {
      contador.style.display = "none";
    }
  }

  window.actualizarContadorCarrito = actualizarContadorCarrito;
  window.actualizarCarritoUI = actualizarCarritoUI;
  window.mostrarToast = mostrarToast;

  actualizarContadorCarrito();
});
