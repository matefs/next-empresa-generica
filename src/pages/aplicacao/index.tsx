import React from 'react';
import { useContext } from 'react';
import ContextoDaAplicacao from "../../../ContextoDaAplicacao.js";
import { useRouter } from 'next/router'
import Header from "../../componentes/Header"
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';


export default function Index( ) {
  const router = useRouter()
  const value = useContext(ContextoDaAplicacao);
  console.log(value);

/*   value.state.bearerToken ? console.log("Sim") :  setTimeout(() => { router?.push('/')}, 0);
 */
  

  return (
    <>
      <Header /> 
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height:500 }}>
      <Typography sx={{color: 'grey'}}>Acesse o menu à esquerda para ver mais opções.</Typography>
    </Box>

    </>
  );

}



