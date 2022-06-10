import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { authReducer } from '../reducers/authReducer';
import thunk from 'redux-thunk'; 
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig={
    key: 'main-root',
    storage
};


const reducers = combineReducers({
    auth: authReducer
});

const persistedReducer=persistReducer(persistConfig, reducers);

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore( 
    persistedReducer,
    composeEnhancers(
        applyMiddleware( thunk )
    )
    );

    const Persistor=persistStore(store);

    export{Persistor};
    export default store;