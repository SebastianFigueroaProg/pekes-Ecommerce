import React from 'react';
import { Facebook } from '../../icons/Facebook';
import { Instagram } from '../../icons/Instagram';
import { WhatsApp } from '../../icons/WhatsApp';
import { AiOutlineAppstore, AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { BiLogOut, BiUserCircle } from "react-icons/bi";
import { Link } from 'react-router-dom';

export const Navbar = () => {

    let login = false;
    
    
    const propWidth = 20;
    const propHeigth = 20;
    const logo = '/assets/imageLogo.jpeg';
    const noImage = '/assets/no-image.jpg';

    return (
        <div>
            <nav className='navbar'>
                <section className='toolbar'>
                    <div className='boxsvg'>
                        <a href="https://www.facebook.com/" target='blank'><Facebook width={propWidth} height={propHeigth}/></a>
                        <a href="https://www.instagram.com/" target='blank'><Instagram width={propWidth} height={propHeigth}/></a>
                        <a href="https://web.whatsapp.com/" target='blank'><WhatsApp width={propWidth} height={propHeigth}/></a>
                    </div>
                    <div>
                        <Link to='/'>
                            <img src={logo} alt="Logo PekesTech" className='image'/>
                        </Link>
                    </div>
                    <div className='conteiner'>
                        <div className='box-conteiner'>
                            <Link to='catalogo' className='objeto1'>
                                <span className='buttonIcon1 pointer'><AiOutlineAppstore/></span>
                                <p className='text1 pointer'>Catalogo</p>
                            </Link>
                            <Link to='buscar' className='objeto2'>
                                <span className='buttonIcon2 pointer'><AiOutlineSearch/></span>
                                <p className='text2 pointer'>Buscar</p>
                            </Link>
                            <Link to='cart' className='objeto3'>
                                <span className='buttonIcon3 pointer'><AiOutlineShoppingCart/></span>
                                <p className='text3 pointer'>Carrito</p>
                            </Link>
                        </div>
                        <div>                            
                            {
                                !login ?
                                        <Link  to='auth/login' className='login'>
                                            <span className='buttonLogin pointer center'><BiUserCircle /></span>
                                        </Link>
                                    : 
                                        <div className='login'>
                                            <Link to='usuario'>
                                                <img src={noImage} alt="Sin Foto" className='imgUser' />
                                            </Link>
                                            <span className='buttonLogout pointer'><BiLogOut /></span>
                                        </div>
                            }                            
                        </div>
                    </div>
                </section>
            </nav>
        </div>
    )
}
