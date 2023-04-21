 
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


import { Produto } from '../types/types'


function ProdutoIndividualComponente() { 
  const router = useRouter()
  const { id }  = router.query 

 const [produtoIndividual, setProdutoIndividual] = useState<Produto>({ id: 0, nome: '', preco: 0, quantidade: 0 , imagem: ''}); 
 const [isEditing, setIsEditing] = useState(false)
 const [ isLoading, setIsLoading ] = useState(true) 

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
    <div>
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

        <Typography variant="body2" color="text.secondary">
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
      : isEditing == true ?  "Editando " :  

        <CircularProgress style={{width: '10%', marginTop:'10%', position: 'fixed'}}/> }
      
      </Grid>

    </div>
  );
}
 

export default ProdutoIndividualComponente;