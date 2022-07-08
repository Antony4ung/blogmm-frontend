/* eslint-disable no-unused-vars */
import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import cookie from 'cookiejs';

export default function ProtectedRoute() {

    const token = cookie.get('token')

return token ?<Outlet/>: <Navigate to="/login"/>
}
