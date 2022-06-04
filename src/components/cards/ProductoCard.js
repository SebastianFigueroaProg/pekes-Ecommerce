import React, { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export const ProductoCard = ({nombre, precio, img, disponible}) => {
    
    const [heart, setHeart] = useState(false)
    
    const clickHeart = ()=>{
        if (heart) {
            setHeart(false)
        } else {
            setHeart(true)
        }
        console.log(heart);
        
    }
    

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
            </article>
        </div>
    )
}
