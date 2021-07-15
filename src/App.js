import React from "react";
import Formularios from "./pages/Formularios";
import Home from "./pages/Home";
import { ThemeProvider, createTheme } from "@material-ui/core";
import { teal } from "@material-ui/core/colors";
import ValidacoesCadastro from "./context/ValidacoesCadastro";
import { validaSenha, validaCpf, validaCEP } from "./models/validacoes";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: teal,
  },
});


function App() {

  function enviarDados(dados) {
    console.log(dados);
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/cadastro">
              <ValidacoesCadastro.Provider
                value={{
                  cpf: validaCpf,
                  senha: validaSenha,
                  cep: validaCEP
                }}
              >
                <Formularios enviarDados={enviarDados} />
              </ValidacoesCadastro.Provider>
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
