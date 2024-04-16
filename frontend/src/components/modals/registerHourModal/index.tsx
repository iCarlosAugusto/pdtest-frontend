import React, { ReactNode, useRef, useState } from "react";
import axiosRequest from "../../../utils/axios";
import "./style.css";

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
  
  const [isLoading, setIsLoading] = useState(false);

  const createSquad = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
            setIsLoading(false);
        } catch (error) {

            //[TO-DO] criar alert de erro
        } finally {
            setIsLoading(false);
        }
    }
  }

  return (
    <>
      {props.isOpen && (
        <div className="modal-overlay" onClick={props.toggle}>
          <div onClick={(e) => e.stopPropagation()} className="modal-box">
            <span>Criar lançamento</span>
            <form onSubmit={createSquad}>
                <input ref={idEmployeeRef} required placeholder="Id do usuário"/>
                <input ref={spentHoursRef} required placeholder="Horas gastas"/>
                <input ref={descriptionRef} required placeholder="Descrição"/>
            
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