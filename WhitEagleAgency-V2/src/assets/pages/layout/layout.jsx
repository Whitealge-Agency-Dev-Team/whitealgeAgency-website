import { Outlet, Link } from 'react-router-dom'
import Header from "./header"
import Footer from './footer'

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