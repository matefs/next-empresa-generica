import React, { useState, useEffect} from 'react'
import axios from 'axios'
import {CircularProgress, Box, Typography, Avatar, Card, CardContent} from "@mui/material";
import Header from '../../../componentes/Header';


export default function Index(){
    const [ carregandoBooleano, setCarregandoBooleano ] = useState(true)
    const [ listaUsuarios, setListaUsuarios ] = useState([])

    function carregarVariosUsuarios(){
        axios.get('https://generic-api-backend.mateusschverz.repl.co/usuarios?_limit=20&_sort=id&_order=desc')
        .then(resposta => {
            Object.keys(resposta.data).length > 1 ? (function(){
                setListaUsuarios(resposta.data)
                setCarregandoBooleano(false)
            })()
              : alert('Houve um erro ao carregar os usuários, tente mais tarde.')
        })
    }



    useEffect(() => {
        carregarVariosUsuarios()
    },[])

    return( 
        <> 

          <Typography variant='h3' sx={{textAlign:"center"}}>Lista de usuários</Typography>
<Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: 'row',
          flexWrap: "wrap", 
          gap: { sm: 4, md: 5, lg: 9 },
        }}
      >


 

       { carregandoBooleano == true ? 
                  <CircularProgress
                  style={{
                      width: "10%",
                      marginLeft: "0%",
                      marginTop: "10%",
                      position: "fixed",
                    }}
                    />
                    : listaUsuarios.map((usuario) => {
                        return(
                            <Card
                                key={usuario.id}
                                sx={{ width: 300, maxWidth: 745, cursor: `pointer`, marginTop: 2 }} 
                                >
                                <Avatar
                                    sx={{ height: 260, maxHeight: 700, width: '100%'}} 
                                />

                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    {usuario.nome}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">Endereco: {usuario.cidade}/{usuario.estado} </Typography>
                                    <Typography variant='body2' color='text.secondary'> E-mail: {usuario.email} </Typography>
                                    <Typography variant='body2' color='text.secondary'> CPF: {usuario.cpf} </Typography>
                                    
                                </CardContent>
                            </Card>
                            )
                        })}

</Box>
 
        </>
    )
}