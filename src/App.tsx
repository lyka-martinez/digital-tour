import { useState } from 'react'
import { First, Second } from './components/sample-comps'

import './styles/App.css'

export default function App() {
    const [count, setCount] = useState(0)
    const [show, setShowSample] = useState(true)

    return (
        <>
            <h1 className="font-montserrat font-semibold uppercase">Virtual Tour</h1>
            <div className="card">
                <button className="btn" onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>

                <p className="mt-4">
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>

            <div className="card">
                <button className="btn btn-outline" onClick={() => setShowSample((show) => !show)}>
                    Toggle Components
                </button>
            </div>

            <p className="text-brnd-secondary">
                {/* Click on the Vite and React logos to learn more */}
                {show ? <First /> : <Second />}
            </p>
        </>
    )
}
