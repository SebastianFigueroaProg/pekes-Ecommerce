import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ProductoCard } from '../cards/ProductoCard';

export const BuscarScreen = () => {
    
    const [input, setInput] = useState('');
    const [buscador, setBuscador] = useState([]);

    const urlBuscador = `https://restserver-pekestech.herokuapp.com/buscar/productos/${input}`; 

    useEffect(() => {
        if (input  !== '') {
            const fetchData = async()=>{
            const result = await fetch(urlBuscador);
            const res = await result.json();
            setBuscador(res.results);
            }
            fetchData();            
        }
    }, [urlBuscador, input]);

    const handleChange = (e) =>{
        setInput(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
    }

    return (
        <div className='mainBuscador'>
            <section className='contenedorSuperior'>
                <p>Buscar Producto: </p>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                    placeholder='Buscar'
                    autoComplete='off'
                    name='buscar'
                    value={input}
                    onChange={handleChange}
                    />
                </form>                
            </section>
            <hr />
            <section className='contendorInferior'>
                <p>Producto Buscado:</p>
                <div className='contendorCards'>
                    { 
                        (input !== '')
                            && buscador.map(elem=>(
                                <ProductoCard
                                    key={elem.uid}
                                    {...elem}
                                />
                            ))
                    }
                </div>
            </section>
            <div className='spaceBottom'></div>
        </div>
    )
}
