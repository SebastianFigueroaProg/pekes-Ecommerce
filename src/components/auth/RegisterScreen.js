import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { startRegister } from '../../actions/auth';
import Swal from 'sweetalert2';
import { BiHome } from "react-icons/bi";

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const [ formRegisterValues , handleRegisterImputChange ] = useForm({
        nombre: 'Sebastian Figueroa',
        correo:'test20@test.com',
        password: '123456',
        password2: '123456',
        rol: 'USER_ROLE'
    });

    const { nombre, correo, password, password2, rol } = formRegisterValues;

    const handleRegister = (e) =>{
        e.preventDefault();

        if (password !== password2) {
            return Swal.fire('Error', 'Las contraseñas deben de ser iguales', 'error');
        }

        dispatch(startRegister(nombre, correo, password, rol));        
    }

    return (
        <>
            <h3 className='auth__title'>Register</h3>

            <form onSubmit={ handleRegister }>

                <input 
                        type="text"
                        placeholder='Nombre'
                        name='nombre'
                        className='auth__input'
                        autoComplete='off'
                        value={ nombre }
                        onChange={ handleRegisterImputChange }
                />
                <input 
                    type="text"
                    placeholder='Correo'
                    name='correo'
                    className='auth__input'
                    autoComplete='off'
                    value={ correo }
                    onChange={ handleRegisterImputChange }
                />
                <input 
                    type="password"
                    placeholder='Password'
                    name='password'
                    className='auth__input'
                    value={ password }
                    onChange={ handleRegisterImputChange }
                />
                <input 
                    type="password"
                    placeholder='Confirm password'
                    name='password2'
                    className='auth__input'
                    value={ password2 }
                    onChange={ handleRegisterImputChange }
                />
                <button
                    type='submit'
                    className='btn btn-primary btn-block mb-5'
                >
                    Register
                </button>

                <div className='auth-btnContainer'>
                    <Link to="/auth/login"
                            className='link'
                    >
                    Ya estás registrado?
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
