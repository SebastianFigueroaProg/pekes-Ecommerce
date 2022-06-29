import React, { useEffect, useState } from 'react';
import { ProductoCard } from '../cards/ProductoCard';
import { ProductoList } from '../cards/ProductoList';

export const CatalogoScreen = () => {

    const [catalogo, setCatalogo] = useState([]);
    const [producto, setProducto] = useState([]);
    
    const [searchXcat, setSearchXcat] = useState('');

    const urlCatalogo = 'https://restserver-pekestech.herokuapp.com/categorias?limite=100'; 
    const urlProducto = 'https://restserver-pekestech.herokuapp.com/productos?limite=1000'; 

    useEffect(() => {
        const fetchData = async()=>{
        const result = await fetch(urlCatalogo);
        const res = await result.json();
        setCatalogo(res.categorias);
        }
        fetchData();
    }, []);

    useEffect(() => {

        const fetchProd = async()=>{
        const result = await fetch(urlProducto);
        const res = await result.json();
        setProducto(res.productos);
        }  
        fetchProd();  
    }, []);    

    return (
        <div className='contenedorSection_catalogo'>
            <section className='contenedor_catalogo'>
                <button className='nombreCat pointer' onClick={e=>setSearchXcat('')}>
                    TODOS
                </button>
                {
                    
                    catalogo.map(elem=>(
                        <ProductoList
                            key={elem.uid}
                            {...elem}
                            change={setSearchXcat}                                                       
                        />
                    ))
                }                
            </section>
            <hr />
            <section className='container_cards'>
                {
                    (searchXcat==='')
                        ? producto.map(elem=>(
                            <ProductoCard
                                        key={elem.uid}
                                        {...elem}
                                    />
                        ))
                        : producto.map(elem=>(
                            (searchXcat === elem.categoria._id)
                                    &&<ProductoCard
                                        key={elem.uid}
                                        {...elem}
                                        />
                        ))
                }
            </section>
            <div className='spaceBottom'></div>
        </div>
    )
}
