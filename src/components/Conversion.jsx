import { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import {
  Container,
  Box,
  Typography,
  Select,
  Input,
  Button,
  CardMedia,
  Paper,
  Zoom,
} from "@material-ui/core";

import boy from "../images/boy.gif";

class Conversion extends Component {
  state = {
    from: 0,
    to: 0,
    interposed: false,
    outcome: 0,
  };

  Types = { Decimal: 10, Octal: 8, Quaternary: 4, Binary: 2 };

  Decimal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  Octal = [0, 1, 2, 3, 4, 5, 6, 7, 10];

  Quaternary = [0, 1, 2, 3, 10];

  Binary = [0, 1];

  setValue = (value) =>
    this.setState((prevState) => ({ ...prevState, ...value }));

  setInterposed = (interposed) =>
    this.setState((prevState) => ({ ...prevState, interposed }));

  disableInterposed = () => this.state.interposed && this.setInterposed(false);

  enableInterposed = () => !this.state.interposed && this.setInterposed(true);

  handleChange = ({ target: { name, value } }) => {
    this.disableInterposed();
    this.setValue({ [name]: value });
  };

  handleClick = () => {
    this.enableInterposed();
    console.log("from", this.state.from);
    console.log("to", this.state.to);
    console.log("outcome", this.state.outcome);
  };

  render() {
    const { classes } = this.props;

    /* state objects */
    const { from, to, interposed, outcome } = this.state;

    /* functions */
    const { Types, handleChange, handleClick } = this;

    return (
      <Container>
        <Paper elevation={10} className={classes.paper}>
          <Box
            style={{ backgroundColor: "darkolivegreen", color: "white" }}
            boxShadow={10}
            display="flex"
            justifyContent="center"
            className={classes.box}
          >
            <Typography variant="overline" className={classes.title}>
              number_conversion
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" className={classes.box}>
            <Box>
              <Select
                native
                value={from}
                onChange={handleChange}
                name="from"
                className={classes.select}
              >
                {Object.keys(Types)
                  .reverse()
                  .map((key) => (
                    <option key={key} value={Types[key]}>
                      {key}
                    </option>
                  ))}
              </Select>
            </Box>
            <Box>
              <Select
                native
                value={to}
                onChange={handleChange}
                name="to"
                className={classes.select}
              >
                {Object.keys(Types).map((key) => (
                  <option key={key} value={Types[key]}>
                    {key}
                  </option>
                ))}
              </Select>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" className={classes.box}>
            <Input name="outcome" multiline onChange={handleChange} />
          </Box>
          <Box display="flex" justifyContent="center" className={classes.box}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClick}
              className={classes.button}
            >
              turn
            </Button>
          </Box>
          {!interposed ? (
            <Zoom in={true} timeout={1250}>
              <Box
                display="flex"
                justifyContent="center"
                className={classes.box}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={boy}
                  className={classes.card}
                />
              </Box>
            </Zoom>
          ) : (
            <Typography className={classes.outcome} align="center">
              {outcome}
            </Typography>
          )}
        </Paper>
      </Container>
    );
  }
}

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    backgroundColor: "lightyellow",
  },
  box: {
    marginTop: theme.spacing(2),
  },
  title: {
    fontSize: "1rem",
    margin: theme.spacing(2),
  },
  select: {
    margin: theme.spacing(5),
  },
  button: {
    margin: theme.spacing(5),
  },
  card: {
    maxWidth: 345,
    marginBottom: theme.spacing(5),
  },
  outcome: {
    fontSize: "4rem",
    padding: theme.spacing(10),
  },
});

export default withStyles(useStyles)(Conversion);
