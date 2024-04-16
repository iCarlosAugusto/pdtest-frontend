import { useParams } from "react-router-dom"
import { Header } from "../../components/header/header";
import { Button } from "../../components/button/button";
import { useRef, useState } from "react";
import axiosRequest from "../../utils/axios";

function SquadDetails() {

    const { squadId } = useParams();
    const initialDateRef = useRef<HTMLInputElement>(null);
    const endDateRef = useRef<HTMLInputElement>(null);
    const [reports, setReports] = useState<Report[]>([]);

    const filterByDate = async () => {
        const initialDateIso = initialDateRef.current?.valueAsDate?.toISOString();
        const endDateIso = endDateRef.current?.valueAsDate?.toISOString();
        if(initialDateIso && endDateIso){
            const { data } = await axiosRequest.get(`/squad/${squadId}/totalEmployeeHours?startDate=${initialDateIso}&endDate=${endDateIso}`);
            setReports(data);
        }
    }

    
    return (
        <>
         <Header/>

         <div>
            <span>Nome do Squad</span>

            <span>Horas por membro</span>

            <div className="date-select">
                <input type="date" ref={initialDateRef}/>
                <input type="date" ref={endDateRef}/>
                <Button label="Filtrar por data" onClick={filterByDate}/>
            </div>
         </div>
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
          </div>



        </>
    )
}

export { SquadDetails }