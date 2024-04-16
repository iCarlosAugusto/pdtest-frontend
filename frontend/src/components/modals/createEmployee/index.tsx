import React, { ReactNode, useRef, useState } from "react";
import axiosRequest from "../../../utils/axios";
import "./style.css";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
  didCreated: () => void;
}

function CreateEmployeeModal(props: ModalType) {

  const nameRef = useRef<HTMLInputElement>(null);
  const estimatedHoursRef = useRef<HTMLInputElement>(null);
  const squadIdRef = useRef<HTMLInputElement>(null);
  
  const [isLoading, setIsLoading] = useState(false);

  const createSquad = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameRef.current?.value;
    const estimatedHours = estimatedHoursRef.current?.value;
    const squadId = squadIdRef.current?.value;
    if(name && estimatedHours && squadId) {
        try {
            setIsLoading(true);
            await axiosRequest.post("/employees", {
                name,
                estimatedHours: Number(estimatedHours),
                squadId
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
            <span>Criar Squad</span>
            <form onSubmit={createSquad}>
                <input ref={nameRef} required placeholder="Nome"/>
                <input ref={estimatedHoursRef} required placeholder="Horas estimadas de trabalho"/>
                <input ref={squadIdRef} required placeholder="Squad ID"/>
            
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

export { CreateEmployeeModal }