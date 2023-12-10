import {useState} from 'react'
import './App.css'

function App() {
    const [value, setValue] = useState<string>('')




    return (
        <div>
            <input value={value} onChange={(event) => setValue(event.target.value)} />
            <div className={'table'}>
                <div className={'thead'}>
                    <div className={'tr'}>
                        <div className={'td'}>
                            123
                        </div>
                        <div className={'td'}>
                            456
                        </div>
                        <div className={'td'}>
                            789
                        </div>
                    </div>
                </div>
                <div className={'tbody'}>
                    <div className={'tr' + ' ' + 'half'}>
                        <div className={'td'}>
                            123
                        </div>
                        <div className={'td'}>
                            456
                        </div>
                        <div className={'td'}>
                            789
                        </div>
                        <div className={'bgc'} style={{width: `${value}%`}}>

                        </div>
                    </div>
                    <div className={'tr'}>
                        <div className={'td'}>
                            123
                        </div>
                        <div className={'td'}>
                            456
                        </div>
                        <div className={'td'}>
                            789
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
