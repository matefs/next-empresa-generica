import React, { useState } from "react";
import { Grid, TextField, Button, RadioGroup, FormControlLabel, Radio, Select, MenuItem } from "@mui/material";

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



    <form onSubmit={handleSubmit}>
      <TextField
        label="Nome"
        name="nome"
        value={formulario.nome}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="Email"
        name="email"
        value={formulario.email}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="CPF"
        name="cpf"
        value={formulario.cpf}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="Data de nascimento"
        name="dataNascimento"
        value={formulario.dataNascimento}
        onChange={handleChange}
        type="date"
        fullWidth
      />

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

      <TextField
        label="Cidade"
        name="cidade"
        value={formulario.cidade}
        onChange={handleChange}
        fullWidth
      />

      <Select
        label="Estado"
        name="estado"
        value={formulario.estado}
        onChange={handleChange}
        fullWidth
      >
        <MenuItem value="">Selecione o estado</MenuItem>
        <MenuItem value="AC">Acre</MenuItem>
        <MenuItem value="AL">Alagoas</MenuItem>
        <MenuItem value="AP">Amapá</MenuItem>
        <MenuItem value="AM">Amazonas</MenuItem>
        <MenuItem value="BA">Bahia</MenuItem>
        <MenuItem value="CE">Ceará</MenuItem>
        <MenuItem value="DF">Distrito Federal</MenuItem>
        <MenuItem value="ES">Espírito Santo</MenuItem>
<MenuItem value="GO">Goiás</MenuItem>
<MenuItem value="MA">Maranhão</MenuItem>
<MenuItem value="MT">Mato Grosso</MenuItem>
<MenuItem value="MS">Mato Grosso do Sul</MenuItem>
<MenuItem value="MG">Minas Gerais</MenuItem>
<MenuItem value="PA">Pará</MenuItem>
<MenuItem value="PB">Paraíba</MenuItem>
<MenuItem value="PR">Paraná</MenuItem>
<MenuItem value="PE">Pernambuco</MenuItem>
<MenuItem value="PI">Piauí</MenuItem>
<MenuItem value="RJ">Rio de Janeiro</MenuItem>
<MenuItem value="RN">Rio Grande do Norte</MenuItem>
<MenuItem value="RS">Rio Grande do Sul</MenuItem>
<MenuItem value="RO">Rondônia</MenuItem>
<MenuItem value="RR">Roraima</MenuItem>
<MenuItem value="SC">Santa Catarina</MenuItem>
<MenuItem value="SP">São Paulo</MenuItem>
<MenuItem value="SE">Sergipe</MenuItem>
<MenuItem value="TO">Tocantins</MenuItem>
</Select>
  <TextField
    label="Senha"
    name="senha"
    type="password"
    value={formulario.senha}
    onChange={handleChange}
    fullWidth
  />

  <TextField
    label="Confirmar senha"
    name="confirmarSenha"
    type="password"
    value={formulario.confirmarSenha}
    onChange={handleChange}
    fullWidth
  />

  <Button type="submit" variant="contained" color="primary">
    Enviar
  </Button>
</form>
 

);
};

export default FormularioCadastro;