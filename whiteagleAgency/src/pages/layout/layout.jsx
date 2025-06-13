import { Outlet, Link } from 'react-router-dom'
import Header from "../../components/header/Header"
import Footer from '../../components/Footer'
import layout from "./layout.module.css" 

export default function Layout() {
    return (
        <div className={layout.layout}>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}