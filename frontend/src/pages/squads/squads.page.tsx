import { useEffect, useState } from 'react'
import axiosRequest from '../../utils/axios';
import { Button } from '../../components/button/button';
import Modal from '../../components/modals/squad/squad';
import "./squads.style.css";
import { Header } from '../../components/header/header';
import { useNavigate } from 'react-router-dom';


function SquadPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [squads, setSquads] = useState<Squad[]>([]);
  const navigate = useNavigate();


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  useEffect(() => {
    getSquads();
  }, []);

  const getSquads = async () => {
    try {
      const { data } = await axiosRequest.get("/squad");
      setSquads(data);
    } catch (error) {
      //[TODO] alerta de erro
    }
  }

  return (
    <>
      <Header/>

      <main className='main-content'>
        <Modal
          isOpen={isModalOpen}
          toggle={toggleModal}
          didCreated={getSquads}
        />

        {squads.length === 0 ? (
            <div className='empty-card'>
              <span>Nenhum squad cadastrado. Crie um squad para começar</span>
              <Button label='Criar squad' onClick={toggleModal}/>
            </div>
          ) : (
            <div className='table-container'>
              <table id="tabela">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody id="corpo-tabela">
                {
                  squads.map(el => (
                    <tr key={el.id}>
                      <td>{el.id}</td>
                      <td>{el.name}</td>
                      <td>
                        <Button label='Ver squad' onClick={() => navigate(`/squad/${el.id}`)}/>
                      </td>
                    </tr>
                  ))
                }
                </tbody>
              </table>
              <Button label='Criar squad' onClick={toggleModal}/>
          </div>
          )}
      </main>

      
    </>
  )
}

export { SquadPage }
