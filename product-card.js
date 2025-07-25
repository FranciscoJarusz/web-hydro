const productos = [
  {
    nombre: "Remera 9 de Julio",
    precio: "$21.990,00",
    anuncio: "3 cuotas sin interés de $7.330,00",
    primeraImg: "img/presentacion-remeras/remera-9-de-julio/remera-9-de-julio1.jpg",
    segundaImg: "img/presentacion-remeras/remera-9-de-julio/remera-9-de-julio2.jpg"
  },
  {
    nombre: "Remera Corrientes",
    precio: "$21.990,00",
    anuncio: "3 cuotas sin interés de $7.330,00",
    primeraImg: "img/presentacion-remeras/remera-corrientes/remera-corrientes1.jpg",
    segundaImg: "img/presentacion-remeras/remera-corrientes/remera-corrientes2.jpg"
  },
  {
    nombre: "Remera Gaona",
    precio: "$21.990,00",
    anuncio: "3 cuotas sin interés de $7.330,00",
    primeraImg: "img/presentacion-remeras/remera-gaona/remera-gaona1.jpg",
    segundaImg: "img/presentacion-remeras/remera-gaona/remera-gaona2.jpg"
  }
];

const contenedor = document.getElementById('productos-contenedor');

productos.forEach(producto => {
  const html = `
    <div class="producto">
      <div class="imagen-producto">
        <img class="img-default" src="${producto.primeraImg}" alt="Imágen ${producto.nombre}">
        <img class="img-hover" src="${producto.segundaImg}" alt="Imágen ${producto.nombre}">
      </div>
      <div class="info-producto">
        <span class="nombre-producto">${producto.nombre}</span>
        <span class="precio-producto">${producto.precio}</span>
        <div class="anuncio-producto">
            <i class="fas fa-credit-card"></i>
            ${producto.anuncio ? `<span class="anuncio-producto">${producto.anuncio}</span>` : ''}
        </div>
        <div class="botones-producto">
            <button class="btn btn-comprar">Comprar</button>
            <button class="btn btn-ver">Ver</button>
        </div>
      </div>
    </div>
  `;
  contenedor.innerHTML += html;
});