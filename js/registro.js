const registerButton = document.querySelector('#register');
registerinput.addEventListener('click', validarRegistro());

function validarRegistro() {
   
    const userregister= JSON.parse(localStorage.getItem('usuarioregister'));
  
    const emailRegister = document.querySelector('#emailRegister').value;
  
    for (let i = 0; i < currentUser.length; i++) {
    
      if (userregister[i].email === emailRegister) {
        alert('El correo electrónico ya existe en la lista de usuarios.');
        return;
      }
    }
  
    alert('El correo electrónico no existe en la lista de usuarios.');
  }
  const formularioRegisterHTML = document.getElementById("formularioRegistro")

//Formulario Servicios
 formularioRegisterHTML.addEventListener('submit', (evt) => {

    evt.preventDefault()

    const el = formularioRegisterHTML.elements;

    let id;

    if(idEditar) {
        id = idEditar
    } else {
        id = crypto.randomUUID()
    }


    const nuevoRegistro = {
      
        id: id,
        fullname: el.tituloName.value,
        email:el.emailRegister.value,
        password:el.password.value,
        provincia:el.provincia.value,
        precio: el.precio.valueAsNumber,
        imagen: el.imagen.value,
        rol: el.rol.value,
        fechaDeNacimiento: obtenerFecha(),
    }


    if(idEditar) {
        
        const index = userregister.findIndex(registro => {
            return registro.id === idEditar
        })
     
        registro[index] = nuevoRegistro;
        
        idEditar = undefined;
       
        btn.innerText = "Agregar Nuevo Usuario"
        btn.classList.remove("btn")
    } else {
        userregister.push(nuevoRegistro)
    }


    Swal.fire({
        icon: 'success',
        title: 'Usuario agregado correctamente',
        text: 'El usuario se actualizo correctamente!',
      })


    pintarProductos(userregister)

    localStorage.setItem("usuarioregister",JSON.stringify(userregister))
    
    formularioRegisterHTML.reset()
    el.tituloName.focus()
})





