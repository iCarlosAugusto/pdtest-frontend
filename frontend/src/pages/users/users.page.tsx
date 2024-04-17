import { useEffect, useState } from "react"
import { Header } from "../../components/header/header"
import axiosRequest from "../../utils/axios";
import { Button } from "../../components/button/button";
import { CreateEmployeeModal } from "../../components/modals/createEmployee";

function UsersPage() {

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () =>{
        try {
            const { data } = await axiosRequest.get("/employees");
            setEmployees(data);
        } catch (error) {
            //[TODO] alerta de erro
        }
    }

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }
    

    return (
        <>
        <Header/>
        <CreateEmployeeModal
          isOpen={isModalOpen}
          toggle={toggleModal}
          didCreated={getUsers}
        />

        {employees.length === 0 ? (
            <div className='empty-card'>
              <span>Nenhum squad cadastrado. Crie um squad para começar</span>
              <Button label='Criar squad' onClick={toggleModal}/>
            </div>
          ) : (
            <div className='table-container'>
              <table id="tabela">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Horas</th>
                    <th>Squad ID</th>
                  </tr>
                </thead>
                <tbody id="corpo-tabela">
                {
                  employees.map(el => (
                    <tr key={el.id}>
                      <td>{el.name}</td>
                      <td>{el.estimatedHours}</td>
                      <td>{el.squadId}</td>
                    </tr>
                  ))
                }
                </tbody>
              </table>
              <Button label='Criar usuário' onClick={toggleModal}/>
          </div>
          )}
        </>
    )
}

export { UsersPage }