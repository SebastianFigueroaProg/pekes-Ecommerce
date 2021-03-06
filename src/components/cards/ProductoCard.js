import React, { useState } from 'react';
import { useEffect } from 'react';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaPlusCircle } from "react-icons/fa";
import { guardarLocalStorage } from '../../helpers/guardarLocalStorage';
import Swal from 'sweetalert2';


export const ProductoCard = ({uid,nombre, precio, img, disponible}) => {
    
    const [heart, setHeart] = useState(false);
    const [array, setArray] = useState(['vacio']);    
    
    const clickHeart = ()=>{
        if (heart) {
            setHeart(false)
        } else {
            setHeart(true)
        }        
    };       
    //Usamos udeEffect para cada ocacion que se dispare un cambio de estado se ejecute la funcion para cargar localStorage
    useEffect(() => {        
        guardarLocalStorage(array);                   
    }, [array]);

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
        <div className='card_container'>
            <article className='card_main'>
                <img src={img} alt={nombre} className='card_img' />
                <div className='card_title'>
                    {
                        disponible 
                        ?
                            (
                                <p className='card_texto'><span className='textBold'>{nombre} - </span>${precio}</p>
                            )
                        :
                            (
                                <p className='card_texto'><span className='textBold'>{nombre} - </span>S/stock</p>
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
                <button className='btnAddCarts pointer' onClick={e=>{
                    setArray([uid,nombre,img,precio,disponible,e.timeStamp]);
                    Toast.fire({
                        icon: 'success',
                        title: 'Haz agregado 1 producto al Carrito'
                    });
                }}><FaPlusCircle/></button>
            </article>
        </div>
    )
}
