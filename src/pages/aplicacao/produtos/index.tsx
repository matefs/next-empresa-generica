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
      <CircularProgress style={{width: '10%', marginLeft:'45%', marginTop:'10%', position: 'fixed'}}/> : 
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

          </Container>
        </Box>

    </div>
    </>
  );
};

export default Produtos;

