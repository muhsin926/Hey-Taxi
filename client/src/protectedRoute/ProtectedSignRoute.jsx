import React from 'react'
import useAuth from '../customHooks/useAuth';

const ProtectedSignRoute = ({ children }) => {
    const authenticated = useAuth();
    if (authenticated){
        window.history.back();
        return
    }
   return children
}

export default ProtectedSignRoute