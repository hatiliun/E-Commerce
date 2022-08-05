//DECLARACION DE VARIABLES
let producto = "";
let precio = 0;  
let carrito = [];      // declaracion de array
let seleccion = "";

// ARRAY con precio y declaracion de los productos
 const productos = [
    {nombre: "mouse", precio: 500},
    {nombre: "teclado", precio: 1000},
    {nombre: "auriculares", precio: 300},
    {nombre: "parlantes", precio: 750}
];

// CICLO DO WHILE CON EL FUNCIONAMIENTO DEL PROGRAMA:

do {
    preguntaCompra();   // se pregunta si desea comprar algun producto
    respuestaNo(); // si la respuesta es NO la seleccion de todo el ciclo do while se transforma en NO, por lo cual DEJA de EJECUTARSE
    respuestaIncorrecta();  // si la respuesta es distinta de si o no se reitera la pregunta
    respuestaSi();  // si la respuesta es si se muestra la lista de productos y si no agradecemos al cliente por haber venido.
    operacionPorCasos(); // vas elijiendo los productos que escribis, y cuantas unidades quiere llevar.
    sumaTotal(); // se hace la suma total de los productos en el array carrito
    if (seleccion == "si") {    
        seleccion = prompt ("desea seguir comprando? ")
    }
} while (seleccion == "si");
    



// FUNCIONES:

function preguntaCompra() {
    seleccion = prompt ("Hola, desea comprar algun producto? si o no");
 }

function respuestaIncorrecta() {
    while (seleccion != "si" && seleccion != "no") {
        alert ("por favor ingresa si o no")
        seleccion = prompt ("Hola, desea comprar algun producto? si o no")
    }
}
function respuestaSi() {
    if (seleccion == "si") {
        alert ("A continuación nuestra lista de productos:")
        mapearProductos();
}
}

function respuestaNo() {
     if (seleccion == "no") {
        alert("Gracias por venir, hasta pronto!!")
    }
}

function mapearProductos() {
    let todoslosProductos = productos.map ((producto) => producto.nombre + " $" + producto.precio );
    alert(todoslosProductos.join (" - "));
}

    function operacionPorCasos() {
        // mientras la seleccion siga siendo diferente que NO HACEME ESTO: 
        while (seleccion != "no") {
            producto = prompt("agrega un producto a tu carrito escribiendo alguno de estos: mouse, teclado, auriculares o parlantes")
        
            if (producto == "mouse" || producto == "teclado" || producto == "auriculares" || producto == "parlantes") {
                switch (producto) {
                    case "mouse":
                        precio = 500;
                        break;
        
                    case "teclado":
                        precio = 1000;
                    break;
        
                    case "auriculares":
                        precio = 300;
                        break;
                
                    case "parlantes":
                        precio = 750;
                        break;
        
                    default:
                        break;
                }
                let unidades = parseInt (prompt ("Cuantas unidades quiere llevar"));
                carrito.push ({producto, unidades, precio})
                console.log(carrito);
            }   else {
                alert ("no tenemos ese producto")
            }
            seleccion = prompt ("desea seguir comprando? ")
        
            while (seleccion == "no") {
                alert ("gracias por la compra, hasta pronto !!") 
                carrito.forEach((carritoFinal) => {
                    console.log(`producto: ${carritoFinal.producto}, unidades: ${carritoFinal.unidades}, total a pagar por producto: $${carritoFinal.unidades * carritoFinal.precio} ARS`);
                })
                break;
            }
        }
    }

function sumaTotal() {
const total = carrito.reduce((acc, el) => acc + el.precio * el.unidades, 0 )
console.log (`El total a pagar por su compra a pagar por su compra es: $${total} ARS`);
}



