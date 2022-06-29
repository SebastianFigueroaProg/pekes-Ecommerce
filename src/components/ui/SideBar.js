import React from 'react';
import { BiUserCircle, BiCategory, BiHome, BiSearchAlt2 } from "react-icons/bi";
import { RiProductHuntLine, RiLogoutBoxLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { startLogout } from '../../actions/auth';

export const SideBar = () => {
    
    const dispatch = useDispatch();
    const logo = '/assets/imageLogo.jpeg';
    const noImage = '/assets/no-image.jpg';

    const handleLogout = () =>{
        dispatch( startLogout());
    }

    return (
        <div>
            <aside className='sidebar_container'>
                <Link to='admin'>
                    <img src={logo} alt="Logo" className='aside_img'/>
                </Link>    
                
                <Link to='usuario' className='container_user'>
                    <img src={noImage} alt="Usuario" className='img_user'/>
                    <p>Figueroa Urduñez Sebastian</p>
                </Link>

                <section className='container_menu'>
                    <Link to='*' className='list_icon pointer'><span>Home {'>'}</span><BiHome/></Link>
                    <Link to='user' className='list_icon pointer'><span>Usuarios {'>'}</span><BiUserCircle/></Link>
                    <Link to='productos' className='list_icon pointer'><span>Productos {'>'}</span><RiProductHuntLine/></Link>
                    <Link to='catalogo' className='list_icon pointer'><span>Catalogo {'>'}</span><BiCategory/></Link>
                    <Link to='search' className='list_icon pointer'><span>Buscar {'>'}</span><BiSearchAlt2/></Link>
                </section>
                
                <div onClick={handleLogout} className='logout pointer'><span>Logout {'>'}</span><RiLogoutBoxLine/></div>

            </aside>
        </div>
    )
}
