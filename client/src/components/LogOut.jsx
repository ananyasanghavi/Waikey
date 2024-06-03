import React,{useEffect} from 'react'
import { Navigate } from 'react-router-dom';

const LogOut = () => {
    useEffect(() => {
        localStorage.removeItem('token');
    }, [])
}
export default function LogOut() {
    return <Navigate to="/" />
}