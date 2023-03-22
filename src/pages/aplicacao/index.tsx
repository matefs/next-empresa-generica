import React from 'react';
import { useContext } from 'react';
import ContextoDaAplicacao from "../../../ContextoDaAplicacao.js";
import { useRouter } from 'next/router'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Header from "../../componentes/Header"


export default function Index( ) {
  const router = useRouter()
  const value = useContext(ContextoDaAplicacao);
  console.log(value);

/*   value.state.bearerToken ? console.log("Sim") :  setTimeout(() => { router?.push('/')}, 0);
 */
  

  return (
    <>
      <Header /> 
     

    </>
  );

}



