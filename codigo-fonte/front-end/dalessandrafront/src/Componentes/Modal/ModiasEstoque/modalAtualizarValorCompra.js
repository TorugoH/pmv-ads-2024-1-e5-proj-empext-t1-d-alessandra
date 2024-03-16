import React from 'react';
//import LogoAdicionar from "../../../img/adicionar.png";
import axios from 'axios';
import config from '../../../config/config';
import Alertasucesso from '../../Alertas/AlertaConfirmacao';
import { useState } from 'react';

function ModalAtualizarValorCompra({id}){

    const [qtd, setQtd] = useState(0);
    const [alertVisible, setAlertVisible] = useState(false);
    const handleInputChange = (event) => {setQtd(event.target.value); }
    
    function atualizar(){
        axios.put(config.URL+'estoque/atualizarValorComprado/'+id+'/'+qtd)
        .then((response) => {  
            if (response.status === 200) {
                setAlertVisible(true); 
                setTimeout(() => {
                  setAlertVisible(false);
                  window.location.reload(); 
                }, 1000);
              }

        })
        .catch((error) => {
            console.log(error)
        })
    }
    return(
       <div>
            <button className="" onClick={()=>document.getElementById('my_modal_editarValorCompra'+id).showModal()}>valor comprado</button>
            <dialog id={"my_modal_editarValorCompra"+id} className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
            {alertVisible && <Alertasucesso message="Valor salvo com sucesso" />}
            <br></br>
                    <h3 className="font-bold text-lg">Atualizar valor comprado</h3>
                    <p className="py-4">Digite o valor que o produto foi comprado</p>
                    <input id="mais"   type="text" className="input input-bordered" placeholder="Valor"  onChange={handleInputChange} />    
                    <div className="modal-action">
                        <button className="btn btn-success" onClick={()=>atualizar()}>Alterar</button>
                        <form method="dialog">
                            <button className="btn">Fechar</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}export default ModalAtualizarValorCompra;