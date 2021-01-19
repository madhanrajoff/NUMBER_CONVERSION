import { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import {
  Container,
  Box,
  Typography,
  Select,
  TextField,
  Button,
  CardMedia,
  Paper,
  Zoom,
  Slide,
} from "@material-ui/core";

import boy from "../images/boy.gif";

const beginningState = {
  interposed: false,
  load: "",
  outcome: 0,
};

class Conversion extends Component {
  state = { from: 0, to: 0, ...beginningState };

  Types = { Decimal: 10, Octal: 8, Quaternary: 4, Binary: 2 };

  Decimal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  Octal = [0, 1, 2, 3, 4, 5, 6, 7, 10];

  Quaternary = [0, 1, 2, 3, 10];

  Binary = [0, 1];

  setBeginningState = () =>
    this.setState((prevState) => ({ ...prevState, ...beginningState }));

  setValue = (value) =>
    this.setState((prevState) => ({ ...prevState, ...value }));

  setOutcome = (outcome) =>
    this.setState((prevState) => ({ ...prevState, outcome }));

  setInterposed = (interposed) =>
    this.setState((prevState) => ({ ...prevState, interposed }));

  disableInterposed = () => this.state.interposed && this.setInterposed(false);

  enableInterposed = () => !this.state.interposed && this.setInterposed(true);

  handleChange = ({ target: { name, value } }) => {
    this.setBeginningState();
    this.setValue({
      [name]: !Number.isInteger(value) ? parseInt(value) : value,
    });
  };

  handleClick = () => {
    /* state objects */
    const { from, to, load, outcome } = this.state;

    /* functions */
    const { Binary, Quaternary, Octal, setValue, disableInterposed } = this;

    let pow = 0;

    if ((from === 0 || from === 2) && (to === 0 || to === 10)) {
      let B2D = 0; /* Binary To Decimal */

      const returned = load.split("").reverse();
      returned.forEach((val) => {
        B2D += parseInt(val) * Math.pow(2, pow);
        pow += 1;
      });
      this.setOutcome(B2D);
    }

    this.enableInterposed(); /* disallow gif picture */
  };

  onInput = ({ target: { name, value } }) => {
    /* state objects */
    const { from } = this.state;

    /* functions */
    const { Binary, Quaternary, Octal, setValue, disableInterposed } = this;

    disableInterposed(); /* empower gif picture */

    if (from === 0 || from === 2) {
      if (value.split("").every((val) => Binary.includes(parseInt(val)))) {
        setValue({ [name]: value });
      }
    } else if (from === 4) {
      if (value.split("").every((val) => Quaternary.includes(parseInt(val)))) {
        setValue({ [name]: value });
      }
    } else if (from === 8) {
      if (value.split("").every((val) => Octal.includes(parseInt(val)))) {
        setValue({ [name]: value });
      }
    } else {
      setValue({ [name]: value });
    }
  };

  render() {
    const { classes } = this.props;

    /* state objects */
    const { from, to, interposed, load, outcome } = this.state;

    /* functions */
    const { Types, handleChange, onInput, handleClick } = this;

    return (
      <Container>
        <Paper elevation={10} className={classes.paper}>
          <Box
            boxShadow={10}
            display="flex"
            justifyContent="center"
            className={classes.titleBox}
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
            <TextField
              name="load"
              label="Load"
              type="number"
              value={load}
              onChange={onInput}
            />
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
            <Slide
              direction="left"
              in={true}
              timeout={1500}
              mountOnEnter
              unmountOnExit
            >
              <Box className={classes.outcomeBox} boxShadow={10}>
                <Typography className={classes.outcome} align="center">
                  {outcome}
                </Typography>
              </Box>
            </Slide>
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
    padding: theme.spacing(2),
  },
  titleBox: {
    marginTop: theme.spacing(2),
    backgroundColor: "darkolivegreen",
    color: "white",
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
  outcomeBox: {
    marginTop: theme.spacing(14),
    backgroundColor: "darkgoldenrod",
    color: "white",
  },
  outcome: {
    fontSize: "4rem",
    padding: theme.spacing(3),
  },
});

export default withStyles(useStyles)(Conversion);
