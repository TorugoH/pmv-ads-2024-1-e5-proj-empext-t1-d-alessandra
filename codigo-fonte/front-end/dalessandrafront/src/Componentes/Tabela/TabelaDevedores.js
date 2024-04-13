import React, { useState } from 'react';
import dayjs from 'dayjs';
function TabelaDevedores({ dados }){
    return (
        <table className="table table-xs">
            <thead>
                <tr>
                    <th>Cod.Cliente</th>
                    <th>Nome</th>
                    <th>Data da venda</th>
                    <th>Data prevista para Pagamento</th>
                    <th>Dias que falta para o Pagamento</th>
                    <th>Forma de Pagamento</th>
                    <th>Cod.Venda</th>
                    <th>Valor Total</th>
                </tr>
            </thead>
            <tbody>
                {dados.map((item, index) => (
                    <tr key={index}>
                        <td>{item.codCliente}</td>
                        <td>{item.nomeCliente}</td>
                        <td>{dayjs(item.dtVenda).format("DD/MM/YYYY")}</td>
                        <td>{dayjs(item.dtVenda).add(30,"day").format("DD/MM/YYYY")}</td>
                        <td>{dayjs(dayjs(item.dtVenda).add(30,"day")).diff(item.dtVenda,'day')}</td>
                        <td>{item.formaPagto}</td>
                        <td>{item.codVenda}</td>
                        <td>{'R$ '+item.vlTotal}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TabelaDevedores;