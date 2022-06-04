import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BuscarScreen } from '../components/buscador/BuscarScreen';
import { CarritoScreen } from '../components/cart/CarritoScreen';
import { CatalogoScreen } from '../components/catalogo/CatalogoScreen';
import { HomeScreen } from '../components/home/HomeScreen';
import { Footer } from '../components/ui/Footer';
import { Navbar } from '../components/ui/Navbar';
import { User } from '../components/user/User';

export const DashboardRouter = () => {   
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path='*' element={ <HomeScreen/> }/>
                <Route path='cart' element={ <CarritoScreen/> }/>
                <Route path='catalogo' element={ <CatalogoScreen/> }/>
                <Route path='buscar' element={ <BuscarScreen/> }/>
                <Route path='usuario' element={ <User/> }/>
            </Routes>
            <Footer/>
        </div>
    )
}
