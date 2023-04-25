import React from 'react'
import {Box, Typography, TextField, Button} from '@mui/material'

export default function FormularioCadastro({ativo}){

  function pegarEnvioNovoProduto(event) {
    event?.preventDefault()
    console.log(event)
  }


    return (

          <form onSubmit={pegarEnvioNovoProduto} style={{position:'absolute', backgroundColor: 'white', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
      <Box sx={{ display: 'flex', flexDirection: 'column',  width: '80%', borderRadius: 10}} >
      <Typography variant='h5'> Cadastre um novo produto:</Typography>
        <TextField
          label="Nome" 
          margin="normal"
          required
        />
        <TextField
          label="Preço" 
          margin="normal"
          type="number"
          required
          InputProps={{
            inputProps: { min: 0 },
          }}
        />
        <TextField
          label="Quantidade" 
          margin="normal"
          type="number"
          required 
          InputProps={{
            inputProps: { min: 0},
          }}
        />
        <TextField
          label="URL da imagem do produto" 
          margin="normal"
          required
          placeholder='https://endereco-imagem.com.br'
        />

        <Button variant="contained" type="submit"  sx={{marginTop: '3%'}}>
          Adicionar Produto
        </Button>

        <Button  type="submit" onClick={ () => ativo(false)} sx={{marginTop: '3%'}}>
          Cancelar
        </Button>

      </Box>
    </form>


    )
}