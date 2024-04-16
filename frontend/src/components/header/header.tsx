import { Link } from "react-router-dom"
import { Button } from "../button/button"
import { useState } from "react";
import { RegisterHourModal } from "../modals/registerHourModal";

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    }
    return (    
        <div style={{marginBottom: 20}}>
            <RegisterHourModal
                isOpen={isModalOpen}
                didCreated={() => console.log("e")}
                toggle={toggleModal}
            />
            <header className='header'>
                <h1>PD Hours</h1>
                <Button label='Lançar horas' onClick={toggleModal}/>
            </header>

            <div className='options'>
                <Link to="/">Squad</Link>
                <Link to="/users">Usuários</Link>
            </div>
        </div>
    )
}

export { Header }