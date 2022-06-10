import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { startLogin } from '../../actions/auth';
import { BiHome } from "react-icons/bi";

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [ formLoginValues , handleLoginImputChange ] = useForm({
        email:'test1@test.com',
        password: '123456'
    });

    const { email, password} = formLoginValues;

    const handleLogin = (e) =>{
        e.preventDefault();

        dispatch(startLogin(email, password));
        
    }

    return (
        <>
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

                    <div 
                        className="google-btn"
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Iniciar sesión con Google</b>
                        </p>
                    </div>
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
        </>
    )
}
