//Guardar Datos en localStorage carrito
export const guardarLocalStorage = (data) =>{
    //observo localStorage que exista el KEY sino un array vacio
    let productoCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    if (data[0] !== 'vacio') {
        //se carga el array antes de transformarlo
        productoCarrito.push(data.filter(e=>data[0] !== 'vacio'));                
    }

    //transformo el array para preparar la carga en localStorage
    let cargarArrayJson = JSON.stringify(productoCarrito);
    
    localStorage.setItem('carrito', cargarArrayJson);
}

//Pedir datos de localStorage carrito
export const verLocalStorage = () =>{
    const data = JSON.parse(localStorage.getItem('carrito'));
    return data;
}

//Borrar un Item especifico del localStorage carrito
export const borrarItem = (id) =>{
    //observo localStorage que exista el KEY sino un array vacio
    let productoCarrito = JSON.parse(localStorage.getItem('carrito'));
    let arrayNew = []

    productoCarrito.forEach(element => {
        if (element[5] !== id) {
            arrayNew.push(element)
        }
    });
    
    //transformo el array para preparar la carga en localStorage
    let cargarArrayJson = JSON.stringify(arrayNew);
    
    localStorage.setItem('carrito', cargarArrayJson);
}

export const borrarTodo = (data) =>{
    
    //transformo el array para preparar la carga en localStorage
    let cargarArrayJson = JSON.stringify(data);
    
    localStorage.setItem('carrito', cargarArrayJson);
}