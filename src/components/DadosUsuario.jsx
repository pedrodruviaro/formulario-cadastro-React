import { Button, TextField } from "@material-ui/core";
import React from "react";
import { useState, useContext } from "react";
import ValidacoesCadastro from "../context/ValidacoesCadastro";

export default function DadosUsuario({ aoEnviar, btnMargin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [erros, setErros] = useState({
    senha: { valido: true, texto: "" },
  });

  const validacoes = useContext(ValidacoesCadastro); //values={cfp: func, senha: func}

  function validarCampos(e) {
    const { name, value } = e.target;
    const novoEstado = { ...erros };
    novoEstado[name] = validacoes[name](value);
    setErros(novoEstado);
  }

  function possoEnviar() {
    for (let campo in erros) {
      if (!erros[campo].valido) {
        return false;
      }
    }
    return true;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (possoEnviar()) {
          aoEnviar({ email, senha });
        }
      }}
    >
      <TextField
        variant="outlined"
        color="primary"
        label="Email"
        type="email"
        margin="normal"
        name="email"
        fullWidth
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        variant="outlined"
        color="primary"
        label="Senha"
        name="senha"
        type="password"
        margin="normal"
        fullWidth
        required
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        error={!erros.senha.valido}
        helperText={erros.senha.texto}
        onBlur={validarCampos}
      />
      <Button
        color="primary"
        variant="contained"
        type="submit"
        style={{ marginTop: "1rem" }}
      >
        Próximo
      </Button>
    </form>
  );
}
