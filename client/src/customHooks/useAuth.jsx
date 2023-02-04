
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const useAuth = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate()

    useEffect(()=>{
        const token = JSON.parse(localStorage.getItem("token"))
        if (!token){
          navigate('login')
          return
        }
        setAuthenticated(true)

    //     try {
    //         console.log( process.env.REACT_APP_JWT_SECRET)
    //         const decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
    //         const currentTime = Date.now().valueOf() / 1000;
    //         if (decoded.exp < currentTime) {
    //           navigate("/login");
    //           return;
    //         }
    //         setAuthenticated(true);
    //       } catch (err) {
    //         console.log(err)
    //         navigate("/login");
    //       }
     },[])
  return authenticated
}

export default useAuth