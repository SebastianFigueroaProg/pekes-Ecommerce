import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { googleLogin, startLogin } from '../../actions/auth';
import { BiHome } from "react-icons/bi";

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [ formLoginValues , handleLoginImputChange ] = useForm({
        email:'test1@test.com',
        password: '123456'
    });

    const { email, password } = formLoginValues;

    const handleLogin = (e) =>{
        e.preventDefault();

        dispatch(startLogin(email, password));
        
    }    
    
    const handleCallbackResponse= (response) => {
        dispatch(googleLogin(response.credential));       
    };

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "844798979110-vp4vtmqne0v6tfleekp74ortn4tp3ovl.apps.googleusercontent.com",
            callback:handleCallbackResponse
        })
        google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
            { theme: 'outline', size: 'large'}
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div>
            <h3 className='auth__title'>Login</h3>

            <form onSubmit={ handleLogin }>
                <input 
                    type="text"
                    placeholder='Correo'
                    name='email'
                    className='auth__input'
                    autoComplete='off'
                    value={ email }
                    onChange= { handleLoginImputChange }
                />
                <input 
                    type="password"
                    placeholder='Password'
                    name='password'
                    className='auth__input'
                    value={ password }
                    onChange= { handleLoginImputChange }
                />
                <button
                    type='submit'
                    className='btn btn-primary btn-block'
                >
                    Login
                </button>

                <div className='auth__social-network'>
                    <p>Iniciar con boton de Google</p>
                    <div id='signInDiv' className='google-btn'></div>
                </div>
                    
                <div className='auth-btnContainer'>
                    <Link to="/auth/register"
                            className='link'
                    >
                        Crear una cuenta nueva?
                    </Link>
                    <Link to='/'
                            className='btnHome'
                    >
                        <BiHome/>
                    </Link>                
                </div>
            </form>
        </div>
    )
}
