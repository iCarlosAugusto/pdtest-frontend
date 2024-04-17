import { useParams } from "react-router-dom"
import { Header } from "../../components/header/header";
import { Button } from "../../components/button/button";
import { useRef, useState } from "react";

import axiosRequest from "../../utils/axios";
import { LoadingStatus } from "../../utils/loading_stauts";
import { CreateEmployeeModal } from "../../components/modals/createEmployee";

function SquadDetails() {

    const { squadId } = useParams();
    const initialDateRef = useRef<HTMLInputElement>(null);
    const endDateRef = useRef<HTMLInputElement>(null);
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(LoadingStatus.IDLE);
    const [squadTotalHours, setSquadTotalHours] = useState<number|null>(null);
    const [squadMediaHours, setSquadMediaHours] = useState<number|null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filterByDate = async () => {

      const initialDateIso = initialDateRef.current?.valueAsDate?.toISOString();
      const endDateIso = endDateRef.current?.valueAsDate?.toISOString();
      if(initialDateIso && endDateIso){
        setLoading(LoadingStatus.LOADING);
        try {
          const { data } = await axiosRequest.get(`/squad/${squadId}/totalEmployeeHours?startDate=${initialDateIso}&endDate=${endDateIso}`);
          const totalHours = await getTotalSquadHours(initialDateIso, endDateIso);
          const mediaHours = await getSquadMediaHours(initialDateIso, endDateIso);
          setSquadTotalHours(totalHours ?? 0);
          setSquadMediaHours(mediaHours ?? 0);
          setReports(data);
          setLoading(LoadingStatus.SUCCESS);
        } catch (error) {
          setLoading(LoadingStatus.ERROR);
          //[TO-DO] error
        } 
      }
    }

    const getTotalSquadHours = async (initialDate: string, endDate: string): Promise<number | undefined> => {
      
      try {
        const { data } = await axiosRequest.get(`squad/${squadId}/totalSquadHours?startDate=${initialDate}&endDate=${endDate}`);
        return data.totalHours as number;
      } catch (error) {
        //[TO-DO] error
      }
    }

    const getSquadMediaHours = async(initialDate: string, endDate: string): Promise<number | undefined> => {
      try {
        const { data } = await axiosRequest.get(`squad/${squadId}/mediaSquadHours?startDate=${initialDate}&endDate=${endDate}`);
        console.log(data);
        return data;
      } catch (error) {
        //[TO-DO] error
      }
    }

    const toggleModalUserCreation = () => {
      setIsModalOpen(!isModalOpen);
    }
    
    return (
        <>
         <Header/>

         <div>
            <span>Nome do Squad</span>

            <span>Horas por membro</span>
         </div>

        <CreateEmployeeModal isOpen={isModalOpen} toggle={toggleModalUserCreation} didCreated={() => {}}/>

        <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
          <div className="date-select">
            <input type="date" ref={initialDateRef} style={{marginRight: 16}}/>
            <input type="date" ref={endDateRef} style={{marginRight: 16}}/>
            <Button label="Filtrar por data" onClick={filterByDate}/>
          </div>
          {
            loading === LoadingStatus.LOADING && (
              <span>Carregando...</span>
            )
          }

          {
            loading === LoadingStatus.SUCCESS && reports.length === 0 && (
              <div style={{display: "flex", flexDirection: "column", marginTop: 16}}>
                <span>Nenhum usuário encontrado nesse squad. Crie um usuário para começar</span>
                <Button label="Adicionar usuário" onClick={() => {
                  toggleModalUserCreation()
                }}/>
              </div>
            )
          }

          {
            loading === LoadingStatus.SUCCESS && reports.length > 0 && (
              <div className='table-container'>
              <table id="tabela">
                <thead>
                  <tr>
                    <th>Membro</th>
                    <th>Descrição último lançamento</th>
                    <th>Horas</th>
                    <th>Criado em</th>
                  </tr>
                </thead>
                <tbody id="corpo-tabela">
                  {
                    reports.map(el => (
                      <tr key={el.employeeId}>
                      <td>{el.employeeName}</td>
                      <td>{el.description ?? '-'}</td>
                      <td>{el.spentHours}</td>
                      <td>{el.createdAt?.toString() ?? '-'}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              <span>Horas totais do squad: {squadTotalHours}</span>
              <span>Média de horas por dia: {squadMediaHours}</span>
              </div>
            )
          }   
        </div>
      </>
    )
}

export { SquadDetails }