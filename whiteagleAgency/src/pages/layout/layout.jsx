import { Outlet, Link } from 'react-router-dom'
import Header from "../../components/header/Header"
import Footer from '../../components/footer/Footer'
import layout from "./layout.module.css"

export default function Layout() {
    return (
        <div className={layout.layout}>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}