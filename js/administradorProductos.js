
let servicios =JSON.parse(localStorage.getItem("productos"))|| serviciosPrimerInicio
if( JSON.parse(localStorage.getItem("productos")) === null){
    localStorage.setItem("productos",JSON.stringify(servicios))
}

let idEditar;
const btn = document.querySelector('button.btn[type="submit"]')
const tableBodyHTML = document.querySelector("#table-body")

pintarProductos(servicios)
const inputFiltrarHTML = document.getElementById("filtrar")

const formularioProductoHTML = document.getElementById("formularioProducto")

//Formulario Servicios
formularioProductoHTML.addEventListener('submit', (evt) => {

    evt.preventDefault()

    const el = formularioProductoHTML.elements;

    let id;

    if(idEditar) {
        id = idEditar
    } else {
        id = crypto.randomUUID()
    }


    const nuevoProducto = {
        id: id,
        titulo: el.tituloName.value,
        descripcion: el.descripcion.value,
        precio: el.precio.valueAsNumber,
        imagen: el.imagen.value,
        categoria: el.categoria.value,
        fechaDeCreacion: obtenerFecha(),
    }


    if(idEditar) {
        
        const index = servicios.findIndex(servicio => {
            return servicio.id === idEditar
        })
     
        servicios[index] = nuevoProducto;
        
        idEditar = undefined;
       
        btn.innerText = "Agregar Servicio"
        btn.classList.remove("btn-success")
    } else {
        servicios.push(nuevoProducto)
    }


    Swal.fire({
        icon: 'success',
        title: 'Servicio agregado/modificado correctamente',
        text: 'El servicio se actualizo o modifico correctamente!',
      })


    pintarProductos(servicios)

    localStorage.setItem("productos",JSON.stringify(servicios))
    
    formularioProductoHTML.reset()
    el.tituloName.focus()
})





function pintarProductos(arrayAPintar) {

    tableBodyHTML.innerHTML = "";

    arrayAPintar.forEach(function(serv, index) {
        tableBodyHTML.innerHTML += 
            `<tr>
                <td class="table-image">
                        <img widht="100px" height="100px" src="${serv.imagen}" alt="${serv.titulo}">
                </td>
                <td class="table-title">${serv.titulo}</td>
                <td class="table-description">${serv.descripcion}</td>
                <td class="table-price">${serv.precio}</td>
                <td class="table-category">${serv.categoria}</td>
                <td >
                    <div class="d-flex gap-1">
                        <button class="btn-delete btn btn-danger btn-sm" onclick="borrarProducto('${serv.id}')">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                        <button class="btn btn-success btn-sm" onclick="editarProducto('${serv.id}')" data-bs-toggle="modal" data-bs-target="#formModal">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </div>
                    
                </td>
            </tr>`;
    })
}


//Filtro de Servicios
inputFiltrarHTML.addEventListener('keyup', (evt) => {

    const busqueda = evt.target.value.toLowerCase();
    
    const resultado = servicios.filter((ser) =>  {
        
        const titulo = ser.titulo.toLowerCase()
        
        if( titulo.includes(busqueda)  ) {
            return true
        } 
        return false
    } )
    pintarProductos(resultado)

})


//funcion borrar producto
const borrarProducto = (idABuscar) => {
    

    Swal.fire({
        title: 'Desea borrar producto',
        icon: 'error',
        text: 'Realmente desea elminar el producto?',
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonText: 'Cancelar' ,
        confirmButtonText: 'Borrar',
      }).then((result) => {

        if(result.isConfirmed) {
            const indiceEncontrado = servicios.findIndex((productoFindIndex) => {
                if(productoFindIndex.id === idABuscar) {
                    return true
                }
                return false
            })
            servicios.splice(indiceEncontrado, 1);
            pintarProductos(servicios)

            localStorage.setItem("productos",JSON.stringify(servicios))

            Swal.fire('Borrado!', 'Producto borrado correctamente', 'success')
        }
      })

 
}

// funcion Editar producto
const editarProducto = function(idRecibido) {
    console.log(`Editar elemento ${idRecibido}`)
    
    const productoEditar = servicios.find((sr) => {
        if(sr.id === idRecibido) {
            return true
        }
    })

    if(!productoEditar) return;

    idEditar = productoEditar.id

    const elements = formularioProductoHTML.elements;

    elements.tituloName.value = productoEditar.titulo;
    elements.precio.value = productoEditar.precio;
    elements.descripcion.value = productoEditar.descripcion;
    elements.imagen.value = productoEditar.imagen;
    elements.categoria.value = productoEditar.categoria;
    
    btn.innerText = "Editar Servicios"
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

