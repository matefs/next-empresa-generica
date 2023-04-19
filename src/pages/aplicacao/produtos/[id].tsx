 
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


function MyComponent() { 
  const router = useRouter()
  const { id }  = router.query 

  const [ produtoIndividual, setProdutoIndividual] = useState({})

  
  useEffect(()=> { 
    id != undefined ?  axios.get(`https://generic-api-backend.mateusschverz.repl.co/produtos/${id}`)
     .then(respostaItem => setProdutoIndividual(respostaItem.data)) 
     .catch( (e) => alert("Ocorreu um erro \n" + e))
     : undefined 
  
    }, [id])

  return (
    <div>

 
      { Object.keys(produtoIndividual).length > 1  ? 
              <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {produtoIndividual.nome}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card> :
        <CircularProgress />
       }
      

    </div>
  );
}
 

export default MyComponent;