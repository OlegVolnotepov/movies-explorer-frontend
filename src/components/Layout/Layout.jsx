import React from 'react'
import {Link, Outlet} from 'react-router-dom'
import { Header } from '../Header/Header'
import './layout.css'

export const Layout = () => {
  return (
    <div className='layout'>
    <Header />
    <Outlet />
    <footer>
      Footer
    </footer>
    </div>
  )
}
