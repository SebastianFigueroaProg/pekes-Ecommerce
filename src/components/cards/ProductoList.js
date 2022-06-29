import React from 'react';

export const ProductoList = (props) => {

    return (
        <>           
            <button className='nombreCat pointer' onClick={e=>props.change(props.uid)}>
                {props.nombre}
            </button>
        </>
    )
}
