import React, { useEffect } from 'react';
import Header from '../../../componentes/Header'
import axios from 'axios'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Typography, Button } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

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



<Card sx={{  width:300, maxWidth: 745 }}>

      <CardMedia
        sx={{ height: 260, maxHeight: 700 }}
        image={'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F000%2F582%2F754%2Foriginal%2Fvector-button-plus-icon.jpg&f=1&nofb=1&ipt=24249235270c265685bda77c0dfe13015c81fcc2f83370cc4e29dc210d2636dd&ipo=images'}
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Adicionar novo produto 
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Clique aqui para adicionar um novo produto
        </Typography>
 

      </CardContent>
   

</Card> 


      { listaProdutos.length < 1 ? 
      <CircularProgress style={{width: '10%', marginLeft:'45%', marginTop:'10%', position: 'fixed'}}/> : 
      listaProdutos.map((item,index) => ( 

<Card key={item.id} sx={{  width:300, maxWidth: 745 }} onClick={() => router.push(`/aplicacao/produtos/${item.id}`)} >

      <CardMedia
        sx={{ height: 260, maxHeight: 700 }}
        image={item.imagem}
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.nome} 
        </Typography>

        <Typography variant="body2" color="text.secondary">
          R$ {item.preco}  
        </Typography>
 

      </CardContent>
   

</Card> 


      )) }



    </>
  );
};

export default Produtos;

