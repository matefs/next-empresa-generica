import React, { useEffect } from 'react';
import Header from '../../../componentes/Header'
import axios from 'axios'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Typography, Button } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';

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

      { listaProdutos.length < 1 ? 
      <CircularProgress /> : 
      listaProdutos.map((item,index) => ( 

        <p key={item.id} onClick={() => router.push(`/aplicacao/produtos/${item.id}`)}>{item.nome}</p>
      
      )) }

        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Produtos
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Nesta seção do site, você encontra os vários produtos cadastrados. Cada um deles é possivel ser alterado e deletado.
            </Typography> 
          </Container>
        </Box>

    </div>
    </>
  );
};

export default Produtos;

