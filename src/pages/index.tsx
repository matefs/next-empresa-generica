import React, { useState } from "react";
import axios from "axios";
var urlApiLogin = "https://hazel-snowy-building.glitch.me/usuarios";
import Head from "next/head";
/* import styles from "@/styles/Home.module.css"; */

import { useRouter } from 'next/router';

import { useContext } from "react";
import ContextoDaAplicacao from "../../ContextoDaAplicacao.js";
import {Grid, Box, Paper, Link, Checkbox, FormControlLabel, TextField, CssBaseline, Button, Avatar, Alert, AlertColor } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';


import ImagemLogin from '../../public/assets/ilustracao-para-login.jpg'


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [usuarioFoiEncontrado, setUsuarioFoiEncontrado ] = useState(false);

  interface Alerta  {
    ativo: boolean;
    texto: string;
    tipo: AlertColor;
  }


  const [existeAlerta, setExisteAlerta] = useState<Alerta>({
    ativo: false,
    texto: '',
    tipo: 'error'
  });

  const router = useRouter()

  
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var credenciais = {
      username: data.get('email'),
      password: data.get('password'),
    };
    
    //console.log(credenciais)
    setIsLoading(true); 

    axios.get(urlApiLogin)
    .then(resposta => {
      var listaDeUsuarios = resposta.data;  
      let encontrado = false;
 
      let i = 0;
      while (i < listaDeUsuarios.length && !encontrado) { 
        if (listaDeUsuarios[i].email === credenciais.username && listaDeUsuarios[i].senha == credenciais.password) {
          encontrado = true;  
          break;  
        }
        i++;  
      }
  
      if (encontrado) {
        console.log('Item encontrado!', `valor item i ${i}`);
        router.push('/aplicacao')
      } else {

        console.log('Item não encontrado.');
        setExisteAlerta({
          ativo: true,
          texto: 'Credenciais incorretas, tente novamente ou registre-se.',
          tipo: 'error' as AlertColor
        })

        setIsLoading(false)
      }

      })
 

  };


  const value = useContext(ContextoDaAplicacao);

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

    const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

   
 
  return (
    <>
      <Head>
        <title>Aplicação PRO 1.0</title>
        <meta name="description" content="Aplicação profissional" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>

<Grid container component="main" sx={{ height: '100vh' }}>


        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${ImagemLogin.src})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Entrar
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              {isLoading ? "Carregando..." : ''}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                type='email'
                label="Email do usuário"
                placeholder='usuario@email.com'
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Lembrar-me"
              />
  {existeAlerta.ativo == true && existeAlerta.tipo !== undefined ?  
  <Alert 
  severity={existeAlerta.tipo}
  onClick={() => setExisteAlerta({...existeAlerta, ativo: false})}
  sx={{cursor:'pointer'}}
  >{existeAlerta.texto}</Alert> 
  : null }

{
              isLoading ? 
              <LoadingButton loading  sx={{ mt: 3, mb: 2 }} fullWidth variant="outlined"> Entrar  </LoadingButton>  
: 
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >  Entrar </Button>
}

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Esqueceu a senha ? 
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/registrar" variant="body2">
                    {"Não tem uma conta? Cadastre-se"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>


 


    </>
  );
}

export default Login;
