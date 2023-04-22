 
import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'
import { useRouter } from 'next/router'
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { TextField, Box } from '@mui/material'

import { Produto } from '../types/types'


function ProdutoIndividualComponente() { 
  const router = useRouter()
  const { id }  = router.query 

 const [produtoIndividual, setProdutoIndividual] = useState<Produto>({ id: 0, nome: '', preco: 0, quantidade: 0 , imagem: ''}); 
 const [isEditing, setIsEditing] = useState(false)
 const [ isLoading, setIsLoading ] = useState(true) 

  const [formData, setFormData] = useState({ 
    nome: '',
    preco: '',
    quantidade: '',
    imagem: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData); 
  };


  useEffect(() => { 
    id != undefined ?  axios.get(`https://generic-api-backend.mateusschverz.repl.co/produtos/${id}`)
     .then( (respostaItem) =>  {
      setProdutoIndividual(respostaItem.data)
      setIsLoading(false)
    }) 

     .catch( (e) => {
      alert("Ocorreu um erro \n" + e)
      router.push('/aplicacao/produtos');
     }) : undefined 
 
    }, [id])

  return (
<Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justifyContent="center"
  style={{ minHeight: '100vh', backgroundColor: '#222f3e'}}
>

 
      { isLoading == false && isEditing == false ? 

<Card sx={{  width:300, maxWidth: 745 }}>
      <CardMedia
        sx={{ height: 260, maxHeight: 500 }}
        image={produtoIndividual.imagem}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {produtoIndividual.nome} 
        </Typography>

        <Typography variant="body2" color="text.secondary" >
          Id: {produtoIndividual.id}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          R$ {produtoIndividual.preco}  
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Quantidade: {produtoIndividual.quantidade}  
        </Typography>
        

      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => setIsEditing(true)}>Editar</Button>
        <Button size="small" color='error'>Deletar</Button>
      </CardActions>
</Card> 
      : isEditing == true ?  
      
      <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" sx={{backgroundColor: 'white', padding:4, borderRadius: 2}}>

        <Typography >Edite o cadastro do produto: </Typography>
        <TextField
          name="id" 
          value={produtoIndividual.id}  
          margin="normal"
          disabled={true}
        />

        <TextField
          name="nome"
          label="Nome"
          value={formData.nome}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          name="preco"
          label="Preço"
          value={formData.preco}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          name="quantidade"
          label="Quantidade"
          value={formData.quantidade}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          name="imagem"
          label="Imagem"
          value={formData.imagem}
          onChange={handleChange}
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary">
          Cadastrar
        </Button>

        <Button type="submit" variant="outlined" style={{marginTop:'5%'}} onClick={() => setIsEditing(false)}>
         Cancelar 
        </Button>

      </Box>
    </form>

      :   <CircularProgress style={{width: '10%', position: 'fixed'}}/> }
      
      </Grid>

  );
}
 

export default ProdutoIndividualComponente;