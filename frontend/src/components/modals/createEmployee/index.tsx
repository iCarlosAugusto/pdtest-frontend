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

function CreateEmployeeModal(props: ModalType) {

  const nameRef = useRef<HTMLInputElement>(null);
  const estimatedHoursRef = useRef<HTMLInputElement>(null);
  const squadIdRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string|null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isThereSquad = await verifySquad();
    if(!isThereSquad){
      setError("Nenhum squad encontrado com esse ID");
      return;
    }
    createSquad();
  }

  const verifySquad = async () => {
    const squadId = squadIdRef.current?.value;
    try {
      const { data } = await axiosRequest.get(`/squad/${squadId}`);
      return data;
    } catch (error) {
      //TO-DO ERRO
    }
  }

  const createSquad = async () => {
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
        toast("Funcionário criado com sucesso!")
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
            <span>Criar Funcionário</span>
            {error && (
              <div className="error-container">
                <span className="error-message">{error}</span>
              </div>
            )}
            <form onSubmit={validate} className="fields">
                <input ref={nameRef} required placeholder="Nome" className="field"/>
                <input ref={estimatedHoursRef} required placeholder="Horas estimadas de trabalho"  className="field"/>
                <input ref={squadIdRef} required placeholder="Squad ID"  className="field"/>
            
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