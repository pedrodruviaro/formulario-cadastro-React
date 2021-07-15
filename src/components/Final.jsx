import { Container, makeStyles } from "@material-ui/core";
import { Button, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  btn: {
    display: 'flex',
    margin: '1rem auto'
  }
})

export default function Final() {
  const history = useHistory();

  const classes = useStyles()

  return (
    <Container>
      <Typography variant="h5" component="h2" align="center">
        Cadastro realizao com sucesso!
      </Typography>

      <Button color="primary" variant="contained" onClick={() => history.push("/")} className={classes.btn}>
        home
      </Button>
    </Container>
  );
}
