import React, { useState, useEffect} from 'react'
import axios from 'axios'
import {CircularProgress, Box, Typography } from "@mui/material";


export default function Index(){
    const [ carregandoBooleano, setCarregandoBooleano ] = useState(false)

    function carregarVariosUsuarios(){
        axios.get('https://generic-api-backend.mateusschverz.repl.co/usuarios')
        .then(resposta => {
            Object.keys(resposta.data).length > 1 ? setCarregandoBooleano(true) : alert('Houve um erro ao carregar os usuários, tente mais tarde.')
        })
    }

    useEffect(() => {
        carregarVariosUsuarios()
    },[])

    return( 
        <>
<Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: { sm: 4, md: 5, lg: 9 },
        }}
      >

          <Typography variant='h3'>Lista de usuários</Typography>

        { carregandoBooleano == false ? 
                  <CircularProgress
                  style={{
                      width: "10%",
                      marginLeft: "0%",
                      marginTop: "10%",
                      position: "fixed",
                    }}
                    />
                    : "Carregou" }

</Box>
        </>
    )
}