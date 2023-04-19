import React, { useState } from "react";
import axios from "axios";
var urlApiLogin = "https://dummyjson.com/auth/login";
import Head from "next/head";
/* import styles from "@/styles/Home.module.css"; */

import { useRouter } from 'next/router';

import { useContext } from "react";
import ContextoDaAplicacao from "../../ContextoDaAplicacao.js";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';


/*
1. Faz o request com o axios.
	- Pega o token, atribui ao objeto do contexto
	- Em cada tela puxa o valor do token contexto e faz um axios get

*/



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()

 

  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var credenciais = {
      username: data.get('email'),
      password: data.get('password'),
    };
    
    console.log(credenciais)
    setIsLoading(true); 

    var credenciaisEmFormatoJson = JSON.stringify(credenciais);

    var customConfig = {
      headers: { "Content-Type": "application/json" },
    };

    axios
      .post(urlApiLogin, credenciaisEmFormatoJson, {
        headers: { "Content-Type": "application/json" },
      })
      .then((respostaRequestLogin) => {
        console.log(respostaRequestLogin);

        var tokenDaResposta = respostaRequestLogin.data;
        var valorBearer = Object.values(tokenDaResposta);

        console.log(valorBearer[0]);
        value.setBearerToken(valorBearer[0]);
        console.log(respostaRequestLogin.data.firstName) 
        value.setMeuNome(respostaRequestLogin.data.firstName)
        console.log(value.baererToken);

        setIsLoading(false);
        router.push('./aplicacao/')
      })
      .catch((erroRequestLogin) => {
        console.log(erroRequestLogin);
        alert("Usuário ou senha incorreto");
        setIsLoading(false);
      });
 

  };


  const value = useContext(ContextoDaAplicacao);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

    const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };


/*   const handleSubmit = (event) => {
  event.preventDefault();

    setIsLoading(true);

    console.log(`Email: ${email}, Password: ${password}`);

    var credenciais = { email: email, password: password };

    var credenciaisEmFormatoJson = JSON.stringify(credenciais);

    console.log(credenciaisEmFormatoJson);

    var customConfig = {
      headers: { "Content-Type": "application/json" },
    };

    axios
      .post(urlApiLogin, credenciaisEmFormatoJson, {
        headers: { "Content-Type": "application/json" },
      })
      .then((respostaRequestLogin) => {
        console.log(respostaRequestLogin);

        var tokenDaResposta = respostaRequestLogin.data;
        var valorBearer = Object.values(tokenDaResposta);

        console.log(valorBearer[0]);
        value.setBearerToken(valorBearer[0]);
        value.setMeuNome("NILSONNN")
        console.log(value.baererToken);

        setIsLoading(false);
        router.push('./aplicacao/')
      })
      .catch((erroRequestLogin) => {
        console.log(erroRequestLogin);
        alert("Usuário ou senha incorreto");
        setIsLoading(false);
      });
  } */

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
            backgroundImage: 'url(https://source.unsplash.com/random)',
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
                label="Nome de usuário"
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





{/*       <div className="login-container">


{isLoading ? "Carregando..." : ''}

      <form onSubmit={handleSubmit}>
        <TextField
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={handleEmailChange}
          required
          fullWidth
        />
        <TextField
          id="password"
          label="Senha"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={handlePasswordChange}
          required
          fullWidth
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Entrar
        </Button>
        </form>

      <div>
        <Link href="#">Esqueci minha senha</Link>
      </div>
      <div>
        Não tem uma conta? <Link href="#">Cadastre-se</Link>
      </div> 
 
      </div>  */}


    </>
  );
}

export default Login;
