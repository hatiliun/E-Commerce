// declaracion de constantes para el DOM
const nombre = document.getElementById ("nombre");
const apellido = document.getElementById ("apellido");
const correo = document.getElementById ("correo");
const contraseña = document.getElementById ("contraseña");
const boton = document.getElementById ("btn-registrar");
const resultado = document.querySelector (".resultado");  // clase

// cuando hacemos el click en el boton de registrar nos va a ir saliendo el cartel de error dependiendo el error que sea.
boton.addEventListener ("click",(e) => {
  e.preventDefault();
    let error = validarCampos ();
    if (error[0]) {
        resultado.innerHTML = error [1];
        resultado.classList.add("red");
        
    } else{
        resultado.innerHTML= "Usuario registrado correctamente";
        resultado.classList.add("green");
        resultado.classList.remove("red");
        console.log("El usuario se registró correctamente");
    }
})

// funcion para validar cada caso, en donde va el nombre, apellido, correo y contraseña.
const validarCampos = () => {
  let error = [];
  if (nombre.value.length < 3) {
    error[0] = true;
    error[1] = "El nombre no puede contener menos de 3 caracteres";
    return error;
  } else if (nombre.value.length > 40) {
    error[0] = true;
    error[1] = "El nombre no puede contener mas de 40 caracteres";
    return error;
  } else if (apellido.value.length < 3 || apellido.value.length > 40)
  { 
      error [0] = true ;
      error [1] = "Ingrese un apellido valido por favor" ;
      return error;
  }
  else if (correo.value.length < 3 || correo.value.length > 40 || correo.value.indexOf ("@") == -1 || correo.value.indexOf (".") == -1 )
            { 
                error [0] = true ;
                error [1] = `"El correo es invalido, asegurese que contenga los siguientes caracteres "@" y "." ` ;
                return error;
            }
    else if (contraseña.value.length < 3 || contraseña.value.length > 40)
            { 
                error [0] = true ;
                error [1] = "Ingrese la contraseña a registrar por favor, no puede tener menos de 3 caracteres" ;
                return error;
            }
    

  error [0] = false;
  return error;
}



