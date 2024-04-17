import React, { ReactNode, useRef, useState } from "react";
import axiosRequest from "../../../utils/axios";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
  didCreated: () => void;
}

function RegisterHourModal(props: ModalType) {

  const idEmployeeRef = useRef<HTMLInputElement>(null);
  const spentHoursRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string|null>(null);
  
  const [isLoading, setIsLoading] = useState(false);

  const validate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const employeeId = idEmployeeRef.current?.value;
    const { data } = await axiosRequest.get(`/employees/${employeeId}`);
    if(!data){
      setError("Nenhum funcionário encontrado com esse ID");
      return;
    }

    createSquad();
  }

  const createSquad = async () => {
    const employeeId = idEmployeeRef.current?.value;
    const spentHours = spentHoursRef.current?.value;
    const description = descriptionRef.current?.value;
    if(employeeId && spentHours && description) {
      try {
        setIsLoading(true);
        await axiosRequest.post("/reports", {
          employeeId,
          spentHours: Number(spentHours),
          description
        });
        props.didCreated();
        props.toggle();
        toast("Criado com sucesso!")
        setIsLoading(false);
      } catch (error) {
            //[TO-DO] criar alert de erro
      } finally {
        setIsLoading(false);
      }
    }
  }

  const closeModal = () => {
    setError(null);
    props.toggle();
  }


  return (
    <>
      <ToastContainer/>
      {props.isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div onClick={(e) => e.stopPropagation()} className="modal-box">
            <span>Criar lançamento</span>
            {error && (
              <div className="error-container">
                <span className="error-message">{error}</span>
              </div>
            )}
            <form onSubmit={validate} className="fields">
                <input
                  ref={idEmployeeRef}
                  required
                  placeholder="Id do usuário"
                  className="field"
                  style={{marginTop: 32}} 
                  type="number"
                />
                <input
                  ref={spentHoursRef}
                  required
                  placeholder="Horas gastas"
                  className="field"
                  type="number"
                />
                <input
                  ref={descriptionRef}
                  required
                  placeholder="Descrição"
                  className="field"
                />
            
                <button type="submit">
                    Criar usuário
                </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export { RegisterHourModal }