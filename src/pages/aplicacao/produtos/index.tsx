import React, { useEffect } from 'react';
import Header, {valorBarraPesquisaPublico } from '../../../componentes/Header'
import axios from 'axios'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Typography, Button, TextField } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { Produto } from '../types/types'

const Produtos = () => {
  const router = useRouter();
  const [ listaProdutos, setListaProdutos ] = useState<Produto[]>([])
  const [ cadastrandoNovo, setCadastrandoNovo ] = useState(false)

  const [ novoProduto, setNovoProduto ] = useState({
    nome: '',
    price: 0,
    quantidade: 0,
    imagemUrl: ''
  })


  function pegarEnvioNovoProduto(event) {
    event?.preventDefault()
    console.log(event)
  }
 

  useEffect( () => {
    axios.get('https://generic-api-backend.mateusschverz.repl.co/produtos')
    .then(respostaRequisicao => setListaProdutos(respostaRequisicao.data))

  }, [])

  return (
    <>
    <Header />

            



{
  cadastrandoNovo == true ?  <>
    <form onSubmit={pegarEnvioNovoProduto} style={{position:'absolute', backgroundColor: 'white', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
      <Box sx={{ display: 'flex', flexDirection: 'column',  width: '80%', borderRadius: 10}} >
      <Typography variant='h5'> Cadastre um novo produto:</Typography>
        <TextField
          label="Nome" 
          margin="normal"
          required
        />
        <TextField
          label="Preço" 
          margin="normal"
          type="number"
          required
          InputProps={{
            inputProps: { min: 0 },
          }}
        />
        <TextField
          label="Quantidade" 
          margin="normal"
          type="number"
          required 
          InputProps={{
            inputProps: { min: 0},
          }}
        />
        <TextField
          label="URL da imagem do produto" 
          margin="normal"
          placeholder='https://endereco-imagem.com.br'
        />

        <Button variant="contained" type="submit"  sx={{marginTop: '3%'}}>
          Adicionar Produto
        </Button>

        <Button  type="submit" onClick={ () => setCadastrandoNovo(false)} sx={{marginTop: '3%'}}>
          Cancelar
        </Button>

      </Box>
    </form>

  </> :  undefined  }  

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

        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: {sm: 4, md: 5, lg: 9}
            
          }}
           onClick={() => console.log(valorBarraPesquisaPublico)}
           > {/* Principal */}



  
{ cadastrandoNovo == false && listaProdutos.length > 1 ?
   <Card sx={{  width:300, maxWidth: 745,  cursor: `pointer` }} onClick={() => setCadastrandoNovo(true)} >

      <CardMedia
        sx={{ height: 260, maxHeight: 700 }}
        image={'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F000%2F582%2F754%2Foriginal%2Fvector-button-plus-icon.jpg&f=1&nofb=1&ipt=24249235270c265685bda77c0dfe13015c81fcc2f83370cc4e29dc210d2636dd&ipo=images'}
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Adicionar novo produto 
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Clique  para adicionar um novo produto
        </Typography>
 

      </CardContent>
   

</Card> : undefined
/** Fim cadastrando novo */} 



      { listaProdutos.length < 1 ? 
      <CircularProgress style={{width: '10%', marginLeft:'0%', marginTop:'10%', position: 'fixed'}}/> : 
      listaProdutos.map((item,index) => ( 

<Card key={item.id} sx={{  width:300, maxWidth: 745,  cursor: `pointer` }} onClick={() => router.push(`/aplicacao/produtos/${item.id}`)} >

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

</Box>

    </>
  );
};

export default Produtos;

