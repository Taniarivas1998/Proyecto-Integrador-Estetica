const user =JSON.parse(localStorage.getItem("usuarios"))|| usuariosInicio
if( JSON.parse(localStorage.getItem("usuarios")) === null){
    localStorage.setItem("usuarios",JSON.stringify(usuariosInicio))
}

let idEditar;
const btn = document.querySelector('button.btn[type="submit"]')
const tableBodyHTML = document.querySelector("#table-body")

pintarProductos(user)
const inputFiltrarHTML = document.getElementById("filtrar")

const formularioProductoHTML = document.getElementById("formularioUsuario")

// !LISTENER EVENTO FORMULARIO
formularioProductoHTML.addEventListener('submit', (evt) => {

    evt.preventDefault()

    const el = formularioProductoHTML.elements;

    let id;

    if(idEditar) {
        id = idEditar
    } else {
        id = crypto.randomUUID()
    }


    const nuevoUsuario = {
        id: id,
        fullname: el.tituloNombre.value,
        email: el.email.value,
        role: el.role.value,
        fechaDeNacimiento: obtenerFecha(),
    }


    if(idEditar) {

        const index = user.findIndex(usuario => {
            return usuario.id === idEditar
        })

        user[index] = nuevoUsuario;
        idEditar = undefined;

        btn.innerText = "Agregar Usuario"
        btn.classList.remove("btn-success")
    } else {
        usuarios.push(nuevoUsuario)
    }


    Swal.fire({
        icon: 'success',
        title: 'Usuario amodificado correctamente',
        text: 'El Usuario se actualizo o modifico correctamente!',
      })


    pintarProductos(user)

    localStorage.setItem("personas",JSON.stringify(user))
    
    formularioProductoHTML.reset()
    el.tituloNombre.focus()
})

function pintarProductos(arrayAPintar) {

    tableBodyHTML.innerHTML = "";

    arrayAPintar.forEach(function(usu, index) {
        tableBodyHTML.innerHTML += 
            `<tr>
                <td class="table-nombre">${usu.fullname}</td>
                <td class="table-email">${usu.email}</td>
                <td class="table-rol">${usu.role}</td>
                <td >
                    <div class="d-flex gap-1">
                        <button class="btn-delete btn btn-danger btn-sm " onclick="borrarProducto('${usu.id}')">
                            <i class="fa-solid fa-trash "></i>
                        </button>
                    </div>
                    
                </td>
            </tr>`
    })
}

//Funcion para filtrar usuario
inputFiltrarHTML.addEventListener('keyup', (evt) => {

    const busqueda = evt.target.value.toLowerCase();
    
    const resultado = user.filter((u) =>  {

        const fullname = u.fullname.toLowerCase()
    
        if( fullname.includes(busqueda)  ) {
            return true
        } 
        return false
    } )
    pintarProductos(resultado)

})

//funcion borra usuario
const borrarProducto = (idABuscar) => {
    

    Swal.fire({
        title: 'Desea borrar Usuario',
        icon: 'error',
        text: 'Realmente desea elminar el Usuario?',
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonText: 'Cancelar' ,
        confirmButtonText: 'Borrar',
      }).then((result) => {

        if(result.isConfirmed) {
            const indiceEncontrado = user.findIndex((productoFindIndex) => {
                if(productoFindIndex.id === idABuscar) {
                    return true
                }
                return false
            })
            user.splice(indiceEncontrado, 1);
            pintarProductos(user)

            localStorage.setItem("usuarios",JSON.stringify(user)  )

            Swal.fire('Borrado!', 'Usuario borrado correctamente', 'success')
        }
      })

}
    

//funcion obtener fecha
function obtenerFecha() {
    const fecha = new Date()
    let mes = fecha.getMonth() + 1;
    if(mes < 10) {
        mes = '0'+ mes
    }
    let dia = fecha.getDate()
    if(dia < 10) {
        dia = '0' + dia
    }
    const year = fecha.getFullYear()

    const fechaFormateada = `${year}-${mes}-${dia}`
    return fechaFormateada
}
