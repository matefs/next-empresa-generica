 
import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'
import { useRouter } from 'next/router'
import CircularProgress from '@mui/material/CircularProgress';


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
      <h1>Hello </h1>
      
      { Object.keys(produtoIndividual).length > 1  ? JSON.stringify(produtoIndividual) :
        <CircularProgress />
       }
      

    </div>
  );
}
 

export default MyComponent;