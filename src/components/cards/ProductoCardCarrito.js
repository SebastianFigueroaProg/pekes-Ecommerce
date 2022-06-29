import React, { useState } from 'react';
import { useEffect } from 'react';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaMinusCircle } from "react-icons/fa";
import { borrarItem } from '../../helpers/guardarLocalStorage'
import Swal from 'sweetalert2';

export const ProductoCardCarrito = (props) => {
    
    const [heart, setHeart] = useState(false);
    const [data, setData] = useState('');
    
    const clickHeart = ()=>{
        if (heart) {
            setHeart(false)
        } else {
            setHeart(true)
        }        
    }
    
    useEffect(() => {
        borrarItem(data)
    }, [data])   

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-start',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    return (
        <div className='card_container' id='cardId'>
            <article className='card_main'>
                <img src={props[2]} alt={props[1]} className='card_img' />
                <div className='card_title'>
                    {
                        props[4] 
                        ?
                            (
                                <p className='card_texto'><span className='textBold'>{props[1]} - </span>${props[3]}</p>
                            )
                        :
                            (
                                <p className='card_texto'><span className='textBold'>{props[1]} - </span>S/stock</p>
                            )
                    }
                </div>
                <button className='btn_heart pointer' onClick={clickHeart}>
                {
                    !heart
                        ?
                                <AiOutlineHeart/>                                                
                        :                            
                                <AiFillHeart/>                    
                }
                </button>
                <button className='btnSubstractCarts pointer' onClick={e=>{
                    setData(props[5]);
                    props.change(!props.value)
                    Toast.fire({
                        icon: 'error',
                        title: 'Se elimino un producto del Carrito'
                    });
                }}
                ><FaMinusCircle/></button>
            </article>
        </div>
    )
}

