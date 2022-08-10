/*
1) LEER LOS DATOS DEL PRODUCTOS SELECCIONADO
2) MOSTRANDO EN EL CARRITO LOS PRODUCTOS SELECCIONADOS
3) ACTUALIZAR LA CANTIDAD DE PRODUCTOS EN EL CARRITO
4) ELIMINAR UN PRODUCTO DEL CARRITO
5) VACIAR EL CARRITO DE COMPRA

*/

//VARIABLES

const carritos = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaProductos = document.querySelector(".container_productos");
let buttonAlert = document.querySelector("#btn-alert");
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
  listaProductos.addEventListener("click", agregarProducto);


  //Eliminar productos del carrito
  carritos.addEventListener("click", eliminarProducto);
  siCarritoNoTieneNada();
  //Vaciando el carrito

  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = [];
    carritoHTML();
    localStorage.removeItem("carrito");
    siCarritoNoTieneNada();

  });
}
//FUNCIONES

// (1) A través del boton podemos acceder al producto seleccionado
function agregarProducto(e) {
  e.preventDefault();


  if (e.target.classList.contains("button-product")) {
    const productoSeleccionado = e.target.parentElement;
    leerDatosProducto(productoSeleccionado);
    siCarritoTieneAlgo();
    seAñadeProductoToastify();
  }
}

// (4) Eliminar producto del carrito
function eliminarProducto(e) {
  e.preventDefault();
  // console.log(e.target.classList);
  if (e.target.classList.contains("borrar-producto")) {
    const productoID = e.target.getAttribute("id");

    //Eliminar del arreglo de articulosCarrito por el id
    articulosCarrito = articulosCarrito.filter((producto) => producto.id !== productoID);

    carritoHTML();
    siCarritoTieneAlgo();
    siCarritoNoTieneNada();
  }

}

// (2) Leer los datos del producto seleccionado y lo extrae
function leerDatosProducto(producto) {
  const infoProducto = {
    imagen: producto.querySelector("img").src,
    titulo: producto.querySelector("h5").innerText,
    precio: producto.querySelector("p").innerText,
    id: producto.querySelector(".button-product").dataset.id,
    cantidad: 1
  };


  const {
    imagen,
    titulo,
    precio,
    id,
    cantidad
  } = infoProducto;

  // DESESTRUCTURACION PARA PODER VISUALIZAR EN LA CONSOLA EL PRODUCTO CON TODA SU INFORMACION
  console.log(`El producto seleccionado es el siguiente: ${titulo}`, `El precio es de: ${precio}`, `Su ID es el: ${id}`, `Link a la imagen del producto seleccionado: ${imagen}`);

  //Revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some((producto) => producto.id === infoProducto.id);
  if (existe) {
    //Actualizamos la cantidad
    const productos = articulosCarrito.map((producto) => {
      if (producto.id === infoProducto.id) {
        producto.cantidad++;
        return producto; // retorna objeto actualizado
      } else {
        return producto; // retorna los objetos que no son duplicados
      }
    });
    articulosCarrito = [...productos];
  } else {
    //Agregar elementos al arreglo del carrito
    articulosCarrito = [...articulosCarrito, infoProducto];
  }
  carritoHTML();

}

// (3) Muestra el Carrito en el HTML
function carritoHTML() {
  //Limpiar el HTML
  limpiarHTML();
  //Recorre el carrito y genera el HTML
  articulosCarrito.forEach((producto) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${producto.titulo}</td>
    <td>${producto.precio}</td>
    <td>${producto.cantidad}</td>
    <td><a href="" class="borrar-producto" id="${producto.id}">x</a> </td>`; // CLASE PARA BORRAR EL PRODUCTO "X"
    //Agrega el HTML del carrito en el tbody 
    contenedorCarrito.appendChild(row);
    // creamos el json transformado ya a string para que guarde los valores del carrito que vaya llenando el usuario
    const enJSON = JSON.stringify(articulosCarrito);
    localStorage.setItem("carrito", enJSON);


  });

  carritoTotal();
}

// funcion para la suma total de los productos en el carrito
function carritoTotal() {
  let Total = 0;
  let totalDOM = document.querySelector(`.total`);
  articulosCarrito.forEach((producto) => {

    const precio = Number(producto.precio.replace("$", ``))
    Total = Total + precio * producto.cantidad
    Total = Number(Total.toFixed(3));
  })
  totalDOM.innerHTML = `${Total}`
}

// (5) Elimina los productos del HTML
function limpiarHTML() {
  contenedorCarrito.innerHTML = "";
}

// traemos los valores del carrito del usuario para mostrarlo en pantalla nuevamente.
let carritoGuardado = JSON.parse(localStorage.getItem(`carrito`))
if (carritoGuardado) {
  articulosCarrito = carritoGuardado;
  carritoHTML();
  carritoTotal();
  siCarritoTieneAlgo();
}
// OPERADOR TERNARIO que lo que hace es que cuando relogeamos la pagina nos avisa por consola si tenemos algun producto o no en el carrito
// PROBE HACERLO CON SWEET ALERT PERO ME MARCA COMO QUE NO ESTA DEFINIDA LA VARIABLE SWAL y no lo pude solucionar
articulosCarrito.length > 0 ? console.log("Su carrito tiene productos") : console.log("Su carrito no tiene productos")

// funciones con alertas sweet alert
function siCarritoNoTieneNada() {
  while (articulosCarrito.length == 0) {
    buttonAlert.addEventListener("click", () =>
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Tu carrito está vacio! Agrege productos antes de comprar',
      }))
    break;
  }
}

function siCarritoTieneAlgo() {
  while (articulosCarrito.length > 0) {
    buttonAlert.addEventListener("click", () => {
      Swal.fire(
        'Felicitaciones!',
        'Tu compra se realizó correctamente',
        'success'
      )
    })
    break;
  }

}

// ALERTA TOASTIFY PARA CUANDO AÑADIS UN PRODUCTO AL CARRITO
function seAñadeProductoToastify() {
  Toastify({
    text: "Producto añadido al carrito",
    duration: 1500,
    position: "right",
    style: {
      background: "#7a4ed7",
      borderRadius: "10px",
      borderColor: "black",
    },

  }).showToast();
}