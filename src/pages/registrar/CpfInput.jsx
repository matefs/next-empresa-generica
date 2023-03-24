import React, { useState } from "react";
import TextField from "@mui/material/TextField";

function formatCPF(cpf) {
  cpf = cpf.replace(/\D/g, ""); // remove tudo que não é dígito
  console.log(cpf)
  // cpf = cpf.padStart(11, "0"); // completa com zeros à esquerda até ter 11 dígitos
  cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"); // adiciona pontos e hífen
  return cpf;
}

function CPFInput() {
  const [cpf, setCPF] = useState("");

  function handleChange(event) {
    const newCPF = event.target.value;
    setCPF(formatCPF(newCPF));
  }

  return (
    <TextField
      label="CPF"
      value={cpf}
      onChange={handleChange}
      placeholder="000.000.000-00"
      required
      inputProps={{
        inputMode: "numeric",
        pattern: "[0-9]*",
        maxLength: 14,
        minLength: 14
      }}
      fullWidth
    />
  );
}

export default CPFInput;

