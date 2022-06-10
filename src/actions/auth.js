import { fetchConToken } from "../helpers/fetch"
import { types } from "../types/types";
import Swal from 'sweetalert2';



export const startLogin = ( correo, password) => {
    return async(dispatch) => {
        
        const resp = await fetchConToken('auth/login', {correo, password }, 'POST' );
        const body = await resp.json();

        if ( body.usuario !== undefined ) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( login({
                uid: body.usuario.uid,
                name: body.usuario.nombre,
                rol: body.usuario.rol,
                estado: body.usuario.estado
            }) )
        } else{
            Swal.fire('Error', body.msg, 'error');
        }
        
    }
}

export const startRegister = (nombre, correo, password, rol) =>{
    return async( dispatch ) => {

        const resp = await fetchConToken('usuarios', {nombre, correo, password, rol }, 'POST' );
        const body = await resp.json();

        if ( body.usuario !== undefined ) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( login({
                uid: body.usuario.uid,
                name: body.usuario.nombre,
                rol: body.usuario.rol,
                estado: body.usuario.estado
            }) )
        } else{
            Swal.fire('Error', body.errors[0].msg, 'error');
        }
        
    }
}

export const startChecking = () =>{
    return async(dispatch) =>{

        const resp = await fetchConToken('auth/renew');
        const body = await resp.json();

        if ( body.usuario !== undefined ) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( login({
                uid: body.usuario.uid,
                name: body.usuario.nombre,
                rol: body.usuario.rol,
                estado: body.usuario.estado
            }) )
        } else{
            dispatch(checkingFinish());
        }

    }
}

const checkingFinish = () => ({type: types.authCheckingFinish});

const login = (user)=>({
    type: types.authLogin,
    payload: user
})

export const startLogout = () =>{
    return( dispatch )=>{
        localStorage.clear();
        dispatch(logout());
    }
}

const logout = () =>({type: types.authLogout});