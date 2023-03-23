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


const FormularioCadastro = () => {
  const [formulario, setFormulario] = useState({
    nome: "",
    email: "",
    cpf: "",
    dataNascimento: "",
    sexo: "",
    cidade: "",
    estado: "",
    senha: "",
    confirmarSenha: ""
  });

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formulario);
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrar
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>




            <Grid container spacing={2}>
              <Grid item xs={12}>
            <TextField
        label="Nome"
        name="nome"
        value={formulario.nome}
        onChange={handleChange}
        fullWidth
      />
      </Grid>

              <Grid item xs={12}>
      <TextField
        label="Email"
        name="email"
        value={formulario.email}
        onChange={handleChange}
        fullWidth
      />
      </Grid>

              <Grid item xs={12}>
      <TextField
        label="CPF"
        name="cpf"
        value={formulario.cpf}
        onChange={handleChange}
        fullWidth
      />
      </Grid>


              <Grid item xs={12}>
      <TextField
        label=""
        name="dataNascimento"
        value={formulario.dataNascimento}
        onChange={handleChange}
        type="date"
        fullWidth
      />
      </Grid>


              <Grid item xs={12}>
                <Typography>Sexo</Typography>
      <RadioGroup
        aria-label="sexo"
        name="sexo"
        value={formulario.sexo}
        onChange={handleChange}
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
      <TextField
        label="Cidade"
        name="cidade"
        value={formulario.cidade}
        onChange={handleChange}
        fullWidth
      />
</Grid>

              <Grid item xs={12}> 
 <Typography>Estado</Typography>
      <Select 
        name="estado"
        value={formulario.estado}
        onChange={handleChange}
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
    label="Senha"
    name="senha"
    type="password"
    value={formulario.senha}
    onChange={handleChange}
    fullWidth
  />
        </Grid>


              <Grid item xs={12}> 
  <TextField
    label="Confirmar senha"
    name="confirmarSenha"
    type="password"
    value={formulario.confirmarSenha}
    onChange={handleChange}
    fullWidth
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
                <Link href="#" variant="body2">
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