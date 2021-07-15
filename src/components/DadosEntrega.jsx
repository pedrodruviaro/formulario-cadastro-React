import { Button, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useContext } from "react";
import ValidacoesCadastro from "../context/ValidacoesCadastro";

const useStyles = makeStyles({
  btn: {
    display: "flex",
    marginTop: '1rem'
  },
  espacamento: {
    marginRight: "1rem",
  },
});

export default function DadosEntrega({ aoEnviar }) {
  const classes = useStyles();

  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const [erros, setErros] = useState({cep: {valido: true, texto: ""}})

  const validacoes = useContext(ValidacoesCadastro)

  function validaCampo(e){
    const {name, value} = e.target
    const novoEstado = {...erros}
    novoEstado[name] = validacoes[name](value)
    setErros(novoEstado)
  }

  function possoEnviar(){
    for(let campo in erros){
      if(!erros[campo].valido){
        return false
      }
    }
    return true
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if(possoEnviar()){
          aoEnviar({ cep, endereco, numero, cidade, estado });
        }
      }}
    >
      <TextField
        variant="outlined"
        color="primary"
        label="CEP"
        name="cep"
        type="number"
        margin="normal"
        fullWidth
        required
        value={cep}
        onChange={(e) => setCep(e.target.value)}
        error={!erros.cep.valido}
        helperText={erros.cep.texto}
        onBlur={validaCampo}
      />
      <TextField
        variant="outlined"
        color="primary"
        label="Endereço"
        name="endereco"
        type="text"
        margin="normal"
        fullWidth
        required
        value={endereco}
        onChange={(e) => setEndereco(e.target.value)}
      />
      <TextField
        variant="outlined"
        className={classes.espacamento}
        color="primary"
        label="Número"
        name="numero"
        type="number"
        required
        margin="normal"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
      />
      <TextField
        variant="outlined"
        color="primary"
        label="Cidade"
        name="cidade"
        type="text"
        margin="normal"
        value={cidade}
        required
        onChange={(e) => setCidade(e.target.value)}
      />
      <TextField
        variant="outlined"
        color="primary"
        label="Estado"
        name="estado"
        type="text"
        margin="normal"
        required
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
      />

      <Button
        color="primary"
        variant="contained"
        type="submit"
        className={classes.btn}

      >
        Próximo
      </Button>
    </form>
  );
}
