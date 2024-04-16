import { Link } from "react-router-dom"
import { Button } from "../button/button"

const Header = () => {
    return (    
        <div style={{marginBottom: 20}}>
            <header className='header'>
                <h1>PD Hours</h1>
                <Button label='Lançar horas' onClick={() => console.log("Lancar")}/>
            </header>

            <div className='options'>
                <Link to="/">Squad</Link>
                <Link to="/users">Usuários</Link>
            </div>
        </div>
    )
}

export { Header }