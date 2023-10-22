let servicios =JSON.parse(localStorage.getItem("productos"))|| serviciosPrimerInicio
if( JSON.parse(localStorage.getItem("productos")) === null){
    localStorage.setItem("productos",JSON.stringify(servicios))
}

const containerCardsHTML = document.querySelector(".container-cards");

function pintarProducto(productosAPintar){

    containerCardsHTML.innerHTML = "";

    productosAPintar.forEach(function(product,index){
        

        containerCardsHTML.innerHTML += 
        `
             <div class="card-container">
                 <article class="product-card">
                    <div class="card-header">
                       <figure>
                         <img class="servicio img-fluid" src="${product.imagen}" alt="${product.nombre}">
                       </figure>
                     </div>
                     <div class="card-main">
                       <h2>${product.titulo}</h2>
                       <div class="card-description">
                         <p>${product.descripcion}</p>
                       </div>
                       <div class="card-prices">
                         <div class="card-fecha">
                            <p class="text-container">${product.fechaDeCreacion} </p> 
                         </div>
                         <div class="card-price text-container">
                          <p class="precio text-container">$${product.precio} </p>
                         </div>
                       </div>
                     </div>
                     <div class="card-footer">
                           <button class="card-details">Ver Detalles</button>
                           <button class="card-buy">Comprar</button>
                     </div>
                 </article>
              </div>
        `
    })

    
};
pintarProducto(servicios);
