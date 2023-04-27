import React, { useEffect } from "react";
import Header from "../../../componentes/Header";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { Box, Container, Typography, Button, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AddIcon from '@mui/icons-material/Add';
import { Produto } from "../types/types";
import FormularioCadastro from "./componentes/FormularioCadastro";

const Produtos = () => {
  const router = useRouter();
  const [listaProdutos, setListaProdutos] = useState<Produto[]>([]);
  const [cadastrandoNovo, setCadastrandoNovo] = useState(false);
 
  function trazTodosProdutos() {
    axios
      .get(
        "https://generic-api-backend.mateusschverz.repl.co/produtos?_limit=20&_sort=id&_order=desc"
      )
      .then((respostaRequisicao) => setListaProdutos(respostaRequisicao.data))
      .catch((erro) => {
        alert(`Ocorreu um erro: \n ${erro}`);
      });
  }

  function handleChildEvent(valorCampoPesquisa: string) {
    valorCampoPesquisa == ""
      ? trazTodosProdutos()
      : filtrarProdutos(valorCampoPesquisa);
  }

  function pegarEstadoFormularioNovo(valorEstado: boolean) {
    valorEstado == false
      ? setCadastrandoNovo(false)
      : valorEstado == true
      ? setCadastrandoNovo(true)
      : undefined;
  }

  function filtrarProdutos(valorCampoPesquisa: string) {
    valorCampoPesquisa != undefined && valorCampoPesquisa.toString().length >= 1
      ? axios
          .get(
            `https://generic-api-backend.mateusschverz.repl.co/produtos?nome_like=${valorCampoPesquisa}`
          )
          .then((respostaRequisicao) => {
            respostaRequisicao.data.length > 0
              ? setListaProdutos(respostaRequisicao.data)
              : alert("Produtos não encontrados");
          })
      : valorCampoPesquisa == undefined
      ? undefined
      : valorCampoPesquisa.toString().length < 1 ||
        valorCampoPesquisa == "" ||
        valorCampoPesquisa == " "
      ? trazTodosProdutos()
      : undefined;
  }

  useEffect(() => {
    trazTodosProdutos();
  }, []);

  useEffect(() => {
    trazTodosProdutos();
  }, [cadastrandoNovo]);

  return (
    <>
      <Header onChildEvent={handleChildEvent} />

      {cadastrandoNovo == true ? (
        <FormularioCadastro ativo={pegarEstadoFormularioNovo} />
      ) : undefined}

      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Produtos
        </Typography>
      </Container>

      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: { sm: 4, md: 5, lg: 9 },
        }}
      >
        {" "}
        {/* Principal */}
        {
          cadastrandoNovo == false && listaProdutos.length >= 1 ? (
            <Card
              sx={{ width: 300, maxWidth: 745, cursor: `pointer` }}
              onClick={() => setCadastrandoNovo(true)}
            >
              <AddIcon
                sx={{ height: 260, maxHeight: 700, width:'100%' }}
              />

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Adicionar novo produto
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Clique para adicionar um novo produto
                </Typography>
              </CardContent>
            </Card>
          ) : undefined
          /** Fim cadastrando novo */
        }
        {listaProdutos.length < 1 ? (
          <CircularProgress
            style={{
              width: "10%",
              marginLeft: "0%",
              marginTop: "10%",
              position: "fixed",
            }}
          />
        ) : (
          listaProdutos.map((item, index) => (
            <Card
              key={item.id}
              sx={{ width: 300, maxWidth: 745, cursor: `pointer`, marginTop: 2 }}
              onClick={() => router.push(`/aplicacao/produtos/${item.id}`)}
            >
              <CardMedia
                sx={{ height: 260, maxHeight: 700 }}
                image={item.imagem}
              />

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.nome}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  R$ {item.preco}
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </>
  );
};

export default Produtos;
