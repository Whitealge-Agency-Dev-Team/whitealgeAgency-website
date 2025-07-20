import { useState } from 'react'

export default function NoPage() {
    const [count, setCount] = useState(0)

    return (
        <>
        <h1>Página no encontrada</h1>
        </>
    )
}