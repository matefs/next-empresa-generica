 
import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'
import { useRouter } from 'next/router'
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { TextField, Box, Alert } from '@mui/material'

import { Produto } from '../../../types/types'


function ProdutoIndividualComponente() { 
  const router = useRouter()
  const { id }  = router.query 

 const [produtoIndividual, setProdutoIndividual] = useState<Produto>({ id: 0, nome: '', preco: 0, quantidade: 0 , imagem: ''}); 
 const [isEditing, setIsEditing] = useState(false)
 const [ isLoading, setIsLoading ] = useState(true) 
 const [tipoDoAlerta, setTipoDoAlerta ] = useState('')
 const [textoDoAlerta, setTextoDoAlerta] = useState('')
 const [houveAlertaBooleano, setHouveAlertaBooleano] = useState(false);

  const [formData, setFormData] = useState({ 
    nome: '',
    preco: 0,
    quantidade: 0,
    imagem: ''
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };



function chamarAlerta(texto:string, tipo: any) {
    
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



  const handleSubmit = (event: any) => {
    event.preventDefault();
    const { nome, preco, quantidade, imagem  } = formData;

    nome.length >= 1 && preco >= 1 && quantidade >= 1 && imagem.includes('http') ?
     axios.put(`https://generic-api-backend.mateusschverz.repl.co/produtos/${id}`, formData , {
        headers: {
        'Content-Type': 'application/json'
        }
    }).then(resposta => {
      setTipoDoAlerta('success');
      setTextoDoAlerta('O produto atual foi editado com sucesso');
      
      setIsEditing(false)
      setHouveAlertaBooleano(true)
      trazProdutoIndividual() 
    })
    .catch((erro) => alert(`Houve um erro ao editar produto: \n ${erro}`))

    : nome.length < 1 || preco < 1 || quantidade < 1 || !imagem.includes('http') ? (function() {
      setTipoDoAlerta('error')
      setTextoDoAlerta('Houve um erro ao editar o produto, você deve corrigir os campos abaixo')
      setHouveAlertaBooleano(true)
    
    })()
    : null

  };


  function deletarProduto() {
    var confirmacao = confirm('Tem certeza que deseja deletar o produto ? ')

    confirmacao == true ? 
    axios.delete(`https://generic-api-backend.mateusschverz.repl.co/produtos/${id}`)
    .then((resposta) => {
      alert('Produto deletado com sucesso')
      router.push('/aplicacao/produtos')
    })
    .catch(erro => alert(`Houve um erro ao deletar: \n ${erro}`))
    : null

  }


  function trazProdutoIndividual(){
     id != undefined ?  axios.get(`https://generic-api-backend.mateusschverz.repl.co/produtos/${id}`)
     .then( (respostaItem) =>  {
      setProdutoIndividual(respostaItem.data)
      setIsLoading(false)
    }) 

     .catch( (e) => {
      alert("Ocorreu um erro \n" + e)
      router.push('/aplicacao/produtos');
     }) : undefined 
 
  }

  useEffect(() => { 
    trazProdutoIndividual()
 
  }, [id])


  useEffect(() => {
    setFormData({
    nome: produtoIndividual.nome,
    preco: produtoIndividual.preco,
    quantidade: produtoIndividual.quantidade,
    imagem: produtoIndividual.imagem
  });
  },[isEditing])


  return (
<Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justifyContent="center"
  style={{ minHeight: '100vh', backgroundColor: '#222f3e'}}
>
 
        {isLoading == false ? 
        <Typography 
        sx={{color:'#64748b', marginLeft: '-15%', marginBottom: '1%', cursor: 'pointer'}}
        onClick={ () => router.push('/aplicacao/produtos')}
        > ← Voltar para página principal </Typography>
        : null}


        {houveAlertaBooleano == true
          ? chamarAlerta(textoDoAlerta,tipoDoAlerta)
          : null}



      { isLoading == false && isEditing == false ? 
 
<Card sx={{  width: {xs: 290, md:400, lg:500}, maxWidth: 845  }}>

      <CardMedia
        sx={{ height: {xs: 290, md: 400, lg: 420}, maxHeight: 700 }}
        image={produtoIndividual.imagem}
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {produtoIndividual.nome} 
        </Typography>

        <Typography variant="body2" color="text.secondary" >
          Id: {produtoIndividual.id}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          R$ {produtoIndividual.preco}  
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Quantidade: {produtoIndividual.quantidade}  
        </Typography>

      </CardContent>
      
      <CardActions  sx={{ display: 'flex',   alignItems: 'center',   justifyContent: 'center'}}>
        <Button size="small" onClick={() => setIsEditing(true)}>Editar</Button>
        <Button size="small" color='error' onClick={() => deletarProduto()}>Deletar</Button>
      </CardActions>

</Card>  

      : isEditing == true ?  
      
      <form onSubmit={handleSubmit} >
      <Box display="flex" flexDirection="column"  sx={{backgroundColor: 'white', padding:4, borderRadius: 2,  width: { xs: '100%', sm:  400, md: 500, lg: 600}}} >

        <Typography >Edite o cadastro do produto: </Typography>
        <TextField
          name="id" 
          value={produtoIndividual.id}  
          margin="normal"
          disabled={true}
        />

        <TextField
          name="nome"
          required
          label="Nome"
          value={formData.nome}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          type="number"
          required
          name="preco"
          label="Preço"
          value={formData.preco}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          type='number'
          required
          name="quantidade"
          label="Quantidade"
          value={formData.quantidade}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          required
          name="imagem"
          label="Imagem"
          value={formData.imagem}
          onChange={handleChange}
          margin="normal"
        />


        <Button type="submit" variant="contained" color="primary" style={{marginTop:'5%'}}>
         Salvar 
        </Button>

        <Button variant="outlined" style={{marginTop:'5%'}} onClick={() => setIsEditing(false)}>
         Cancelar 
        </Button>



      </Box>
    </form>

      :   <CircularProgress style={{width: '10%', position: 'fixed'}}/> }
      
      </Grid>

  );
}
 

export default ProdutoIndividualComponente;