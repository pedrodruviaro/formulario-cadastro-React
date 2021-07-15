import {
  Button,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Switch,
} from "@material-ui/core";
import { TextField } from "@material-ui/core";
import React, { useContext } from "react";
import { useState } from "react";
import ValidacoesCadastro from "../context/ValidacoesCadastro";

export default function DadosPessoais({ aoEnviar }) {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [cpf, setCpf] = useState("");
  const [promocoes, setPromocoes] = useState(true);
  const [novidades, setNovidades] = useState(true);

  const [erros, setErros] = useState({cpf: {valido: true, texto: ""}})
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
    <form onSubmit={(e) => {
      e.preventDefault()
      if(possoEnviar()){
        aoEnviar({nome, sobrenome, cpf, novidades, promocoes})
      }

    }}>
      <TextField
        variant="outlined"
        color="primary"
        label="Nome"
        name="nome"
        type="text"
        margin="normal"
        fullWidth
        required
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <TextField
        variant="outlined"
        color="primary"
        label="Sobrenome"
        name="sobrenome"
        type="text"
        margin="normal"
        fullWidth
        required
        value={sobrenome}
        onChange={(e) => setSobrenome(e.target.value)}
      />
      <TextField
        variant="outlined"
        color="primary"
        label="CPF"
        name="cpf"
        type="number"
        margin="normal"
        fullWidth
        required
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
        error={!erros.cpf.valido}
        helperText={erros.cpf.texto}
        onBlur={validaCampo}
      />

      <FormGroup style={{marginTop: '1rem'}}>
        <FormLabel component="legend">Notificações por email?</FormLabel>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={promocoes}
              onChange={(e) => setPromocoes(e.target.checked)}
            />
          }
          label="Promoções"
        />
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={novidades}
              onChange={(e) => setNovidades(e.target.checked)}
            />
          }
          label="Novidades"
        />
      </FormGroup>

      <Button color="primary" variant="contained" type="submit" style={{marginTop: '1rem'}}>
        Próximo
      </Button>
    </form>
  );
}
