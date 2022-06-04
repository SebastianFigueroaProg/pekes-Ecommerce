import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { LoadingCard } from '../cards/LoadingCard';
import { ProductoCard } from '../cards/ProductoCard';

export const HomeScreen = () => {

    const url = `https://restserver-pekestech.herokuapp.com/productos`

    const { loading, data } = useFetch(url);
    let datos = {}

    if (data !== null) {
        datos = data.productos      
    }


    return (
        <div>
            <main className='mainHome'>
                <h1>Productos</h1>

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
