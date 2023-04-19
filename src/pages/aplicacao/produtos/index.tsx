import React, { useEffect } from 'react';
import Header from '../../../componentes/Header'
import axios from 'axios'
import { useState } from 'react';

const Produtos = () => {
  const [ listaProdutos, setListaProdutos ] = useState([])

  useEffect( () => {
    axios.get('https://generic-api-backend.mateusschverz.repl.co/produtos')
    .then(respostaRequisicao => setListaProdutos(respostaRequisicao.data))
  }, [])

  return (
    <>
    <Header />
    <div>
      <h2>Produtos</h2>
      <p>Here is a list of our products:</p>

      { listaProdutos.length < 1 ? "Carregando..." : listaProdutos.map((item,index) => ( 
        <p key={item.id} onClick={() => console.log(item.id)}>{item.nome}</p>
      )) }

    </div>
    </>
  );
};

export default Produtos;

