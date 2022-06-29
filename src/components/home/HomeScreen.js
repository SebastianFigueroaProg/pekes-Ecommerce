import React, { useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { LoadingCard } from '../cards/LoadingCard';
import { ProductoCard } from '../cards/ProductoCard';

export const HomeScreen = () => {

    const url = `https://restserver-pekestech.herokuapp.com/productos?limite=15`

    const { loading, data } = useFetch(url);
    let datos = {}

    if (data !== null) {
        datos = data.productos              
    }
    useEffect(() => {  
        
    }, []);    

    return (
        <div>
            <main className='mainHome'>
                <h1>Productos Nuevos</h1>

                <section className='container_cards'>
                    {
                        loading
                            ?
                                <LoadingCard/>
                            :
                                datos.map(elem =>(
                                    <ProductoCard
                                        key={elem.uid}
                                        {...elem}
                                    />
                                ))                                   
                    }
                </section>
                <div className='spaceBottom'></div>
            </main>
        </div>
    )
}
