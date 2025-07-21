import { Outlet, Link } from 'react-router-dom'
import Header from "../../components/Layout/Header/Header"
import Footer from '../../components/Layout/Footer/Footer'

export default function Layout() {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}