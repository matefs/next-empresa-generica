import React, { useEffect } from 'react';
import Header from '../../../componentes/Header'
import axios from 'axios'
import { useState } from 'react';
import { useRouter } from 'next/router';

import { Produto } from '../types/types'

const Produtos = () => {
  const router = useRouter();
  const [ listaProdutos, setListaProdutos ] = useState<Produto[]>([])

  useEffect( () => {
    axios.get('https://generic-api-backend.mateusschverz.repl.co/produtos')
    .then(respostaRequisicao => setListaProdutos(respostaRequisicao.data))

  }, [])

  return (
    <>
    <Header />
    <div>
      <h2>Produtos</h2>
      <p>Aqui está sua lista de produtos:</p>

      { listaProdutos.length < 1 ? "Carregando..." : listaProdutos.map((item,index) => ( 
        <p key={item.id} onClick={() => router.push(`/aplicacao/produtos/${item.id}`)}>{item.nome}</p>
      )) }

    </div>
    </>
  );
};

export default Produtos;

