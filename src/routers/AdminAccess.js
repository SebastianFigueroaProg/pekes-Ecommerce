import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const AdminAccess = ({ children }) => {

    const { rol } = useSelector( state => state.auth );   
    
    return rol === 'ADMIN_ROLE'
        ? children
        : <Navigate to="/auth/login" />
}