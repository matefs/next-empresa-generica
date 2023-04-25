import React, { useState } from "react";
import { Box, Alert, Typography, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";

export default function FormularioCadastro({ ativo }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [houveErroBooleano, setHouveErroBooleano] = useState(false);

  function chamarAlerta(textoDoAlerta) {
    return (
      <Alert
        severity="error"
        sx={{ marginTop: 2, marginBottom: 2, cursor: "pointer" }}
        onClick={() => setHouveErroBooleano(false)}
      >
        {textoDoAlerta}
      </Alert>
    );
  }

  const onSubmit = (dadosFormulario) => {
    dadosFormulario.nome != "" && dadosFormulario.preco > 0;
    dadosFormulario.quantidade > 0;
    dadosFormulario.url.length > 1;
    dadosFormulario.url.includes("http")
      ? alert("vai salvar")
      : setHouveErroBooleano(true);
  };

  return (
    <>
      <form
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
          {houveErroBooleano == true
            ? chamarAlerta(
                "Houve um erro ao cadastrar o produto, corrija os dados informados!"
              )
            : null}

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
            {...register("url")}
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
