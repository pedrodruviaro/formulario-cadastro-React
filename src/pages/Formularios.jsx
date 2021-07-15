import { makeStyles, Step, StepLabel } from "@material-ui/core";
import { Container, Stepper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DadosEntrega from "../components/DadosEntrega";
import DadosPessoais from "../components/DadosPessoais";
import DadosUsuario from "../components/DadosUsuario";
import Final from "../components/Final";

const useStyles = makeStyles({
  title: {
    paddingTop: '1rem'
  }
})

export default function Formularios(props) {

  const classes = useStyles()

  const formularios = [
    <DadosUsuario aoEnviar={coletarDados} />,
    <DadosPessoais aoEnviar={coletarDados} />,
    <DadosEntrega aoEnviar={coletarDados} />,
    <Final />,
  ];

  const [etapaAtual, setEtapaAtual] = useState(0);
  const [dadosColetados, setDadosColetados] = useState({});

  useEffect(() => {
    if (etapaAtual === formularios.length - 1) {
      props.enviarDados(dadosColetados);
    }
  }, [dadosColetados, etapaAtual, formularios.length, props]);

  function coletarDados(dados) {
    setDadosColetados({ ...dadosColetados, ...dados });
    proximo();
  }

  function proximo() {
    setEtapaAtual(etapaAtual + 1);
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" align="center" className={classes.title}>
        Formulário de Cadastro
      </Typography>
      <Stepper activeStep={etapaAtual}>
        <Step>
          <StepLabel>Login</StepLabel>
        </Step>
        <Step>
          <StepLabel>Pessoal</StepLabel>
        </Step>
        <Step>
          <StepLabel>Entrega</StepLabel>
        </Step>
        <Step>
          <StepLabel completed={etapaAtual === 3 ? true : false}>Finalização</StepLabel>
        </Step>
      </Stepper>

      {formularios[etapaAtual]}
    </Container>
  );
}
