import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthRouter } from './AuthRouter';
import { DashboardRouter } from './DashboardRouter';

export const AppRouter = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/auth/*' element={ <AuthRouter/> }/>
                    <Route path='/*' element={ <DashboardRouter/> }/>                    
                </Routes>
            </BrowserRouter>
        </div>
    )
}
