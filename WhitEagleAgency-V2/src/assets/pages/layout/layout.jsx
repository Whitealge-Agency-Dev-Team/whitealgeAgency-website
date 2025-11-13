import { Outlet, Link } from 'react-router-dom'
import Header from "../layout/header"
import Footer from '../layout/footer'

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