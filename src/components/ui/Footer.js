import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook } from '../../icons/Facebook';
import { Instagram } from '../../icons/Instagram';
import { WhatsApp } from '../../icons/WhatsApp';

export const Footer = () => {

    const logo = '/assets/imageLogo.jpeg';
    const propWidth = 30;
    const propHeigth = 30;

    return (
        <div>
            <footer className='footer'>
                <Link to='/'>
                    <img src={logo} alt="Logo" className='pointer imageLogo'/>
                </Link>
                <div className='contenidoTexto'>
                    <p className='textoFooter'>
                        <span>©PEKESTech - 2022</span>Todos los derechos reservados
                    </p>
                </div>
                <div className='contenidoEnlaces'>
                    <a href="https://www.facebook.com/" target='blank'><Facebook width={propWidth} height={propHeigth}/></a>
                    <a href="https://www.instagram.com/" target='blank'><Instagram width={propWidth} height={propHeigth}/></a>
                    <a href="https://web.whatsapp.com/" target='blank'><WhatsApp width={propWidth} height={propHeigth}/></a>
                </div>
                <div className='contenedorBoton'>
                    <a href="https://goo.gl/maps/wWcfuPNMB1YGyQjKA" target='blank' className='botonSitio'>SITIO</a>
                </div>
            </footer>            
        </div>
    )
}
