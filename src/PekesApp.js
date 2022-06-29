import React from 'react';
import { Provider } from 'react-redux';

import { AppRouter } from './routers/AppRouter'
import store, {Persistor}  from './store/store';
import { PersistGate } from 'redux-persist/integration/react';


export const PekesApp = () => {    

    return (
        <Provider store={ store }>
            <PersistGate loading={null} persistor={Persistor} >
                <AppRouter/>
            </PersistGate>
        </Provider>        
    )
}
