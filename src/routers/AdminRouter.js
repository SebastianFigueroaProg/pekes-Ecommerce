import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AdminCatalogo } from '../components/admin/AdminCatalogo';
import { AdminProduct } from '../components/admin/AdminProduct';
import { AdminScreen } from '../components/admin/AdminScreen';
import { AdminSearch } from '../components/admin/AdminSearch';
import { AdminUser } from '../components/admin/AdminUser';
import { SideBar } from '../components/ui/SideBar';
import { User } from '../components/user/User';

export const AdminRouter = () => {   
    return (
        <div className='main-admin'>
            <SideBar/>
            <Routes>
                <Route path='*' element={ <AdminScreen/> }/>
                <Route path='user' element={ <AdminUser/> }/>
                <Route path='catalogo' element={ <AdminCatalogo/> }/>
                <Route path='productos' element={ <AdminProduct/> }/>
                <Route path='usuario' element={ <User/> }/>
                <Route path='buscar' element={ <AdminSearch/> }/>
            </Routes>
        </div>
    )
}
