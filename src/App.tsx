import { useState } from 'react'
import { First, Second } from './components/sample-comps'

import './styles/App.css'

export default function App() {
    const [count, setCount] = useState(0)
    const [show, setShowSample] = useState(true)

    return (
        <>
            <h1 className="font-medium">Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>

            <div className="card text-bermuda">
                <button onClick={() => setShowSample((show) => !show)}>
                    Toggle Components
                </button>
            </div>

            <p className="read-the-docs">
                {/* Click on the Vite and React logos to learn more */}
                {show ? <First /> : <Second />}
            </p>

            <details className="dropdown">
                <summary className="btn m-1">open or close</summary>
                
                <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li><a>Item 1</a></li>
                    <li><a>Item 2</a></li>
                </ul>
            </details>
        </>
    )
}
