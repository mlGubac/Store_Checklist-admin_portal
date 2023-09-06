import React, {Outlet, Navigate} from 'react-router-dom'

const PrivateRoutes = () => {
    const token = localStorage.getItem('token')
    let auth = {token}
    return (
      auth.token ? <Outlet/> : <Navigate to='/'/>
    )

}

export default PrivateRoutes