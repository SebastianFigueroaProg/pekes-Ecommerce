import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export const PrivateRoute = ({isAuthenticated, isRole, children }) => {

    const navigate = useNavigate();

    const [route, setRoute] = useState(children)

    useEffect(() => {
        
        if (isAuthenticated) {
            if (isRole === 'ADMIN_ROLE') {
                setRoute(navigate('/admin/', { replace: true }));
            }else{
                setRoute(<Navigate to='/'/>)
            }
        }
        
    }, [isAuthenticated, isRole, navigate]);
    

    return route
}