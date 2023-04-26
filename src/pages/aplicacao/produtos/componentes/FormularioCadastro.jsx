import React, { useState } from "react";
import { Box, Alert, Typography, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from 'axios'
import CircularProgress from "@mui/material/CircularProgress";


export default function FormularioCadastro({ ativo }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const [tipoDoAlerta, setTipoDoAlerta ] = useState('error')
  const [textoDoAlerta, setTextoDoAlerta] = useState("Houve um erro ao cadastrar o produto, corrija os dados informados!")
  const [houveAlertaBooleano, setHouveAlertaBooleano] = useState(false);
  const [ carregandoBooleano, setCarregandoBooleano ] = useState(false)

  function chamarAlerta(texto, tipo) {
    
    return (
      <Alert
        severity={tipo}
        sx={{ marginTop: 2, marginBottom: 2, cursor: "pointer" }}
        onClick={() => setHouveAlertaBooleano(false)}
      >
        {texto}
      </Alert>
    );
  }

  function cadastrarNovoProduto(dadosFormulario) {
     
    axios.post('https://generic-api-backend.mateusschverz.repl.co/produtos', dadosFormulario , {
    headers: {
        'Content-Type': 'application/json'
    }
    })
    .then(resposta => {
        setCarregandoBooleano(true)
        setTextoDoAlerta('Novo produto cadastrado com sucesso !')
        setTipoDoAlerta('success')
        setHouveAlertaBooleano(true)

        console.log(resposta)
        setTimeout(() => ativo(false) , 2000)

    })

    
  }

  const onSubmit = (dadosFormulario) => {
    dadosFormulario.nome != "" && dadosFormulario.preco > 0;
    dadosFormulario.quantidade > 0;
    dadosFormulario.imagem.length > 1;
    dadosFormulario.imagem.includes("http")
      ? cadastrarNovoProduto(dadosFormulario)
      : setHouveAlertaBooleano(true);
  };

  return (
    <>
        {houveAlertaBooleano == true
          ? chamarAlerta(textoDoAlerta,tipoDoAlerta)
          : null}

      <form  
        disabled={true}
        onSubmit={handleSubmit(onSubmit)}
        style={{
          position: "absolute",
          backgroundColor: "white",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            borderRadius: 10,
          }}
        >
            { carregandoBooleano == true ? <CircularProgress 
              style={{
              width: "10%",
              marginLeft: "40%",
              marginTop: "10%",
              position: "fixed"}}  /> : null }

          <Typography variant="h5"> Cadastre um novo produto:</Typography>
          <TextField
            label="Nome"
            margin="normal"
            required
            {...register("nome")}
          />

          <TextField
            label="Preço"
            margin="normal"
            type="number"
            required
            InputProps={{
              inputProps: { min: 0 },
            }}
            {...register("preco")}
          />
          <TextField
            label="Quantidade"
            margin="normal"
            type="number"
            required
            InputProps={{
              inputProps: { min: 0 },
            }}
            {...register("quantidade")}
          />
          <TextField
            label="URL da imagem do produto"
            margin="normal"
            required
            placeholder="https://endereco-imagem.com.br"
            {...register("imagem")}
          />

          <Button variant="contained" type="submit" sx={{ marginTop: "3%" }}>
            Adicionar Produto
          </Button>

          <Button onClick={() => ativo(false)} sx={{ marginTop: "3%" }}>
            Cancelar
          </Button>
        </Box>
      </form>
    </>
  );
}
