import React, { useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthRouter } from './AuthRouter';
import { DashboardRouter } from './DashboardRouter';
import { useDispatch, useSelector } from 'react-redux';
import { AdminRouter } from './AdminRouter';
import { PrivateRoute } from './PrivateRoute';
import { AdminAccess } from './AdminAccess';
import { startChecking } from '../actions/auth';

export const AppRouter = () => {

    const { estado, rol } = useSelector( state => state.auth );   

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( startChecking() );
    }, [dispatch])
    
    return (
        <div>
            <BrowserRouter>
                <Routes>                
                    <Route path='/*' element={ <DashboardRouter/> }/>

                    <Route path='/auth/*' element={ 
                        <PrivateRoute isAuthenticated={estado} isRole={rol}>
                            <AuthRouter/>
                        </PrivateRoute>
                    }/>

                    <Route path='/admin/*' element={ 
                        <AdminAccess>
                            <AdminRouter/>
                        </AdminAccess>
                    }/>

                </Routes>
            </BrowserRouter>
        </div>
    )
}
