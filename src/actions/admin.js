import { fetchConToken } from "../helpers/fetch"
import Swal from 'sweetalert2';

export const crearProducto = ( nombre,precio,categoria,descripcion ) => {
    return async(dispatch) => {
        
        const resp = await fetchConToken('productos', { nombre,precio,categoria,descripcion }, 'POST' );
        const body = await resp.json();       
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        if (body.msg !== undefined) {
            Swal.fire('Error', body.msg, 'error'); 
        }else if (body !== '') {
            if (body.errors!==undefined) {
                Swal.fire('Error', body.errors[0].msg, 'error');                
            }else {               
                Toast.fire({
                    icon: 'success',
                    title: 'Producto creado y cargado!'
                })
            }
        }      
    }        
}
export const borrarProducto = ( id ) => {
    return async(dispatch) => {
        
        const resp = await fetchConToken(`productos/${id}`, 'DELETE' );
        const body = await resp.json();       
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        
        if (body !== '') {
            if (body.errors!==undefined) {
                Swal.fire('Error', body.errors[0].msg, 'error');                
            }else {               
                Toast.fire({
                    icon: 'success',
                    title: 'Producto Borrado Exitosamente!'
                })
            }
        }      
    }        
}

export const ActualizarProducto = ( id,nombre,precio,descripcion ) => {
    return async(dispatch) => {
        
        let body = {};

        if(nombre !== undefined && precio !== undefined && descripcion !== undefined){
            const resp = await fetchConToken(`productos/${id}`, { nombre,precio,descripcion }, 'PUT' );
            body = await resp.json();       
        } else if (nombre !== undefined && precio !== undefined) {
            const resp = await fetchConToken(`productos/${id}`, { nombre, precio }, 'PUT' );
            body = await resp.json();       
        } else if (nombre !== undefined && descripcion !== undefined) {
            const resp = await fetchConToken(`productos/${id}`, { nombre, descripcion }, 'PUT' );
            body = await resp.json();       
        } else if (nombre !== undefined ) {
            const resp = await fetchConToken(`productos/${id}`, { nombre }, 'PUT' );
            body = await resp.json();       
        }else if (precio !== undefined && descripcion && undefined) {
            const resp = await fetchConToken(`productos/${id}`, { precio, descripcion }, 'PUT' );
            body = await resp.json();       
        } else if (precio !== undefined) {
            const resp = await fetchConToken(`productos/${id}`, { precio }, 'PUT' );
            body = await resp.json();  
        } else if (descripcion !== undefined) {
            const resp = await fetchConToken(`productos/${id}`, { descripcion }, 'PUT' );
            body = await resp.json();  
        }
            
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        if (body.msg !== undefined) {
            Swal.fire('Error', body.msg, 'error'); 
        }else if (body !== '') {
            if (body.errors!==undefined) {
                Swal.fire('Error', body.errors[0].msg, 'error');                
            }else {               
                Toast.fire({
                    icon: 'success',
                    title: 'Producto actualizado!'
                })
            }
        }    
    }        
}
