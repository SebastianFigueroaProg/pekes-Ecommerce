import React, { useEffect } from 'react';
import { useState } from 'react';
import { borrarTodo, verLocalStorage } from '../../helpers/guardarLocalStorage';
import { ProductoCardCarrito } from '../cards/ProductoCardCarrito';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

export const CarritoScreen = () => {

    const usuario = useSelector( state => state.auth );
    let nombre =  []
    if (usuario.name !== undefined) {
        nombre=usuario.name.split(' ');
    }

    const [local, setLocal] = useState([]);
    const [state, setState] = useState(false);

    const storage = JSON.parse(localStorage.getItem('carrito'));

    let costo = 0;

    useEffect(() => {
        setLocal(verLocalStorage);      
    }, [state])
    
    if (local !== null) {
        local.forEach(e=>{
            costo  += e[3]
        })        
    }

    
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    function mostrarCompraRealizada(params) {
        if (params !== null && params.length !== 0) {
            Toast.fire({
                icon: 'success',
                title: `${nombre[0]}, Gracias por tu Compra!`
            })                      
            borrarTodo([])
            setState(!state);
        }else{
            Toast.fire({
                icon: 'error',
                title: 'Realiza un pedido primero!'
            })
        }
    }

    return (
        <div className='contenedorCarrito'>
            <section className='contenedorDatos'>
                <h2>CARRITO DE COMPRAS</h2>
                <div className='contenidoCarrito'>
                    <p><span>Productos en total:</span> {(local !== null) && local.length}</p>
                    <p><span>Costo total de productos:</span> $ {costo}</p>
                    <button className='btn-comprar pointer' onClick={e=>{
                        (usuario.uid  === undefined)
                            ? Toast.fire({
                                icon: 'error',
                                title: 'Debes Iniciar Sesión!'
                                })
                            : mostrarCompraRealizada(storage)                        
                    }}>Comprar</button>
                </div>
            </section>
            <section className='contenedorProdCarrito'>
                {   
                    (local !== null)
                        && local.map(elem=>(
                            <ProductoCardCarrito
                                key={elem[0]}
                                {...elem}
                                value={state}
                                change={setState}                                
                            />
                        ))
                }
            </section>
            <div className='spaceBottom'></div>
        </div>
    )
}
