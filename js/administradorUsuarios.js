let usuariosPrimerInicio =[
    {
        id:'680244b7-59b4-47f5-9885-479cd9f298fc ',
        nombre:'Tania Rivas',
        email:'admin@admin.com',
        rol:'administrador',
        fechaDeCreacion:'2023-12-10',
    },
    {
        id:'d6f73559-cfad-410b-871c-f547bb9094c5 ',
        nombre:'Lujan Aguera',
        email:'lujan@gmail.com',
        rol:'usuario',
        fechaDeCreacion:'2023-12-10' ,
    },
    {
        id:'ebf3d6e1-1ef0-4d6c-870d-0bc5125f3ae4 ',
        nombre:'Lucas Rivas',
        email:'rivasl6@gmail.com',
        rol:'usuario',
        fechaDeCreacion:'2023-12-10' ,
    },
    {
        id:' eb7b3e44-12b7-4340-a8e5-3ddbc32924e7',
        nombre:'Nestor Rivas',
        email:'nestorrs@gmail.com',
        rol:'usuario',
        fechaDeCreacion:'2023-12-10' ,
    },
    {
        id:' d127591c-0d9b-4231-b7e9-98a1b5ee26e7',
        nombre:'Claudia lazarte',
        email:'lazarteclau@gmail.com',
        rol:'usuario',
        fechaDeCreacion:'2023-12-10' ,
    },
    {
        id:' a35cefcd-6a45-491a-8c2f-8674593fd9b2',
        nombre:'Gonzalo Rivas',
        email:'gonzalo96@gmail.com',
        rol:'usuario',
        fechaDeCreacion:'2023-12-10',
    },
    {
        id:'ae65efe6-d4f7-4f05-86ad-a353977462ce ',
        nombre:'Gonzalo Mazza',
        email:'gonzzalo4@gmail.com',
        rol:'usuario',
        fechaDeCreacion:'2023-12-10' ,
    },
    {
        id:'ec3dcefb-480a-46ee-8aad-13ee8fcb500b ',
        nombre:'Lorena Moreno',
        email:'lomoreno@gmail.com',
        rol:'usuario',
        fechaDeCreacion:'2023-12-10' ,
    },
    {
        id:'b65a1d8a-64ae-42d6-a276-e56af6569e01 ',
        nombre:'Sofia Corbalan',
        email:'sofi24@gmail.com',
        rol:'usuario',
        fechaDeCreacion:'2023-12-10' ,
    },
    {
        id:'dca39edb-21dc-4d6f-bc50-c976cd4f21a1 ',
        nombre:'Paula Paredes',
        email:'paupa234@gmail.com',
        rol:'usuario',
        fechaDeCreacion: '2023-12-10',
    },
    {
        id:'d3100fdf-0c7f-4945-942b-5c3c6a8ab920 ',
        nombre:'Guadalupe Ramos',
        email:'guada98@gmail.com',
        rol:'usuario',
        fechaDeCreacion:'2023-12-10' ,
    },
    {
        id:'6d5a7e20-fcfe-4253-a9d4-e8c37ea1ce67 ',
        nombre:'Marlene Sayago',
        email:'marsayago@gmail.com',
        rol:'usuario',
        fechaDeCreacion:'2023-12-10' ,
    }, 
]

let usuarios =JSON.parse(localStorage.getItem("personas"))|| usuariosPrimerInicio
if( JSON.parse(localStorage.getItem("personas")) === null){
    localStorage.setItem("personas",JSON.stringify(usuarios))
}

let idEditar;
const btn = document.querySelector('button.btn[type="submit"]')
const tableBodyHTML = document.querySelector("#table-body")

pintarProductos(usuarios)
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
        nombre: el.tituloNombre.value,
        email: el.email.value,
        rol: el.rol.value,
        fechaDeCreacion: obtenerFecha(),
    }


    if(idEditar) {

        const index = usuarios.findIndex(usuario => {
            return usuario.id === idEditar
        })

        usuarios[index] = nuevoUsuario;
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


    pintarProductos(usuarios)

    localStorage.setItem("personas",JSON.stringify(usuarios))
    
    formularioProductoHTML.reset()
    el.tituloNombre.focus()
})



function pintarProductos(arrayAPintar) {

    tableBodyHTML.innerHTML = "";

    arrayAPintar.forEach(function(usu, index) {
        tableBodyHTML.innerHTML += 
            `<tr>
                <td class="table-nombre">${usu.nombre}</td>
                <td class="table-email">${usu.email}</td>
                <td class="table-rol">${usu.rol}</td>
                <td >
                    <div class="d-flex gap-1">
                        <button class="btn-delete btn btn-danger btn-sm" onclick="borrarProducto('${usu.id}')">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                        <button class="btn btn-success btn-sm" onclick="editarProducto('${usu.id}')" data-bs-toggle="modal" data-bs-target="#formModal">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </div>
                    
                </td>
            </tr>`
    })
}


//Funcion para filtrar usuario
inputFiltrarHTML.addEventListener('keyup', (evt) => {

    const busqueda = evt.target.value.toLowerCase();
    
    const resultado = usuarios.filter((user) =>  {

        const nombre = user.nombre.toLowerCase()
    
        if( nombre.includes(busqueda)  ) {
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
            const indiceEncontrado = usuarios.findIndex((productoFindIndex) => {
                if(productoFindIndex.id === idABuscar) {
                    return true
                }
                return false
            })
            usuarios.splice(indiceEncontrado, 1);
            pintarProductos(usuarios)

            localStorage.setItem("productos",JSON.stringify(servicios)  )

            Swal.fire('Borrado!', 'Usuario borrado correctamente', 'success')
        }
      })

}

// Funcion Editar usuario
const editarProducto = function(idRecibido) {
  console.log(`Editar elemento ${idRecibido}`)
    
    const productoEditar = usuarios.find((us) => {
        if(us.id === idRecibido) {
            return true
        }
    })

    if(!productoEditar) return;

    idEditar = productoEditar.id

    const elements = formularioProductoHTML.elements;

    elements.tituloNombre.value = productoEditar.nombre;
    elements.email.value = productoEditar.email;
    elements.rol.value = productoEditar.rol;
  
    
    btn.innerText = "Editar Usuario"
    btn.classList.add("btn-success")
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