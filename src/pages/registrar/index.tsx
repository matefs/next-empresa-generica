import React, { useState } from "react";
import Avatar from '@mui/material/Avatar'; 
import CssBaseline from '@mui/material/CssBaseline';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { TextField, Button, RadioGroup, FormControlLabel, Radio, Select, MenuItem } from "@mui/material";
import CpfInput from './CpfInput'
import { valorPublicoCPF } from "./CpfInput";
import axios from 'axios'
import { useRouter } from 'next/router'


const FormularioCadastro = () => {
  const router = useRouter()

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  //const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [sexo, setSexo] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");


const formulario: any = {
      nome,
      email, 
      dataNascimento,
      sexo,
      cidade,
      estado,
      senha,
      confirmarSenha,
    };


  const handleChange = (e: any) => {
/*     console.log(e.target.value.slice(0,-1))
    if (e.target.value.toString().length <= 11) {
      setFormulario(e.target.value.slice(0,-1));
    } 
 */

    //console.log(e)
 
  };

  const handleSubmit = (e: any) => {
    e.preventDefault(); 

    formulario.cpf = valorPublicoCPF

    formulario.nome.length >= 1 &&
    formulario.email.includes('@') &&
    formulario.cpf.length >= 1 && 
    formulario.dataNascimento.length > 1 &&
    formulario.sexo.length >= 1  &&
    formulario.cidade.length >= 1 &&
    formulario.estado.length >= 1  && 
    formulario.senha == formulario.confirmarSenha
    ? 
    axios.post('https://generic-api-backend.mateusschverz.repl.co/usuarios',formulario,{
        headers: {
        'Content-Type': 'application/json'
        }
    }).then(resposta => {
      console.log(resposta)
      Object.keys(resposta.data).length >= 1 ? alert('Usuário cadastrado com sucesso ') : alert('Houve um erro ao cadastrar o usuário, tente novamente')
      router.push('./')
    })
 
    : alert('Informaçoes incorretas ou faltando, corrija os campos abaixo !')
  
  };

  return (

   <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon  />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrar
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>




            <Grid container spacing={2}>
              <Grid item xs={12}>
            <TextField
        label="Nome"
        required
        name="nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        fullWidth
      />
      </Grid>

              <Grid item xs={12}>
      <TextField
        label="Email"
        required
        name="email"
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      </Grid>

              <Grid item xs={12}>
<CpfInput />
      </Grid>


              <Grid item xs={12}>
                Data de nascimento:
      <TextField
        required 
        name="dataNascimento"
        value={dataNascimento}
        onChange={(e) => setDataNascimento(e.target.value)}
        type="date" 
        fullWidth
      />
      </Grid>


              <Grid item xs={12}>
                <Typography>Sexo</Typography>
      <RadioGroup
        aria-label="sexo"
        name="sexo"
        value={sexo}
        onChange={(e) => setSexo(e.target.value)}
      >
        <FormControlLabel
          value="masculino"
          control={<Radio />}
          label="Masculino"
        />
        <FormControlLabel
          value="feminino"
          control={<Radio />}
          label="Feminino"
        />
 
      </RadioGroup>
</Grid>



              <Grid item xs={12}> 
 <Typography>Estado</Typography>
      <Select 
        required
        name="estado"
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
        fullWidth 
      >
<MenuItem key={1} value="">Selecione o estado</MenuItem>
<MenuItem key={2} value="AC">Acre</MenuItem>
<MenuItem key={3} value="AL">Alagoas</MenuItem>
<MenuItem key={4} value="AP">Amapá</MenuItem>
<MenuItem key={5} value="AM">Amazonas</MenuItem>
<MenuItem key={6} value="BA">Bahia</MenuItem>
<MenuItem key={7} value="CE">Ceará</MenuItem>
<MenuItem key={8} value="DF">Distrito Federal</MenuItem>
<MenuItem key={9} value="ES">Espírito Santo</MenuItem>
<MenuItem key={10} value="GO">Goiás</MenuItem>
<MenuItem key={11} value="MA">Maranhão</MenuItem>
<MenuItem key={12} value="MT">Mato Grosso</MenuItem>
<MenuItem key={13} value="MS">Mato Grosso do Sul</MenuItem>
<MenuItem key={14} value="MG">Minas Gerais</MenuItem>
<MenuItem key={15} value="PA">Pará</MenuItem>
<MenuItem key={16} value="PB">Paraíba</MenuItem>
<MenuItem key={17} value="PR">Paraná</MenuItem>
<MenuItem key={18} value="PE">Pernambuco</MenuItem>
<MenuItem key={19} value="PI">Piauí</MenuItem>
<MenuItem key={20} value="RJ">Rio de Janeiro</MenuItem>
<MenuItem key={11} value="RN">Rio Grande do Norte</MenuItem>
<MenuItem key={22} value="RS">Rio Grande do Sul</MenuItem>
<MenuItem key={23} value="RO">Rondônia</MenuItem>
<MenuItem key={24} value="RR">Roraima</MenuItem>
<MenuItem key={25} value="SC">Santa Catarina</MenuItem>
<MenuItem key={26} value="SP">São Paulo</MenuItem>
<MenuItem key={27} value="SE">Sergipe</MenuItem>
<MenuItem key={28} value="TO">Tocantins</MenuItem>
</Select>
</Grid>


              <Grid item xs={12}> 
      <TextField
        label="Cidade"
        name="cidade"
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
        fullWidth
        required
      />
</Grid>

              <Grid item xs={12}> 
  <TextField
    label="Senha"
    name="senha"
    required
    type="password"
    value={senha}
    onChange={(e) => setSenha(e.target.value)}
    fullWidth
  />
        </Grid>


              <Grid item xs={12}> 
  <TextField
    label="Confirmar senha"
    name="confirmarSenha"
    type="password"
    value={confirmarSenha}
    onChange={(e) => setConfirmarSenha(e.target.value)}
    fullWidth
    required
  />
        </Grid>
 

</Grid>

              <Grid item xs={12} sx={{p:1}}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Quero receber promoções de marketing e atualizações por e-mail."
                />
              </Grid>



            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrar-se
            </Button>
            <Grid container justifyContent="flex-end" sx={{mb:2 }}>
              <Grid item>
                <Link href="/" variant="body2">
                     Já tem uma conta? Entrar 
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box> 
      </Container>

);
};

export default FormularioCadastro;