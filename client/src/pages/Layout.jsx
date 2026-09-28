
import { Navigate, Outlet } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import Loading from '../components/Loading'


export function AuthLayout(){
  const {user , loadinguser} = useAppContext()

  if(loadinguser) return <Loading/>
  if(!user) return <Navigate to="/login" replace/>

  return <Outlet />

}


export function GuestLayout(){
  const {user , loadinguser} = useAppContext()

  

  if(loadinguser) return <Loading/>
  if(user) return <Navigate to="/" replace/>

  return <Outlet />

}