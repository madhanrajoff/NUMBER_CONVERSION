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
      /* Calculation */
      returned.forEach((val) => {
        B2D += parseInt(val) * Math.pow(2, pow);
        pow += 1;
      });

      /* OutCome */
      this.setOutcome(B2D);
    } else if (from === 10 && to === 2) {
      let D2B = ""; /* Decimal To Binary */

      let returned = parseInt(load);
      while (returned > Math.pow(2, pow)) {
        pow += 1;
      }

      /* Calculation */
      do {
        pow -= 1;
        let divisor = Math.floor(returned / Math.pow(2, pow));
        returned = returned % Math.pow(2, pow);
        D2B += divisor.toString();
      } while (Math.pow(2, pow) !== 1);

      /* OutCome */
      this.setOutcome(parseInt(D2B));
    } else if (from === 4 && (to === 0 || to === 10)) {
      let Q2D = 0; /* Quaternary To Decimal */

      const returned = load.split("").reverse();
      /* Calculation */
      returned.forEach((val) => {
        Q2D += parseInt(val) * Math.pow(4, pow);
        pow += 1;
      });

      /* OutCome */
      this.setOutcome(Q2D);
    } else if (from === 10 && to === 4) {
      let D2Q = ""; /* Decimal To Quaternary */

      let returned = parseInt(load);
      while (returned > Math.pow(4, pow)) {
        pow += 1;
      }

      /* Calculation */
      do {
        pow -= 1;
        let divisor = Math.floor(returned / Math.pow(4, pow));
        returned = returned % Math.pow(4, pow);
        D2Q += divisor.toString();
      } while (Math.pow(4, pow) !== 1);

      /* OutCome */
      this.setOutcome(D2Q);
    } else if (from === 8 && (to === 0 || to === 10)) {
      let O2D = 0; /* Octal To Decimal */

      const returned = load.split("").reverse();
      /* Calculation */
      returned.forEach((val) => {
        O2D += parseInt(val) * Math.pow(8, pow);
        pow += 1;
      });

      /* OutCome */
      this.setOutcome(O2D);
    } else if (from === 10 && to === 8) {
      let D2O = ""; /* Decimal To Octal */

      let returned = parseInt(load);
      while (returned > Math.pow(8, pow)) {
        pow += 1;
      }

      /* Calculation */
      do {
        pow -= 1;
        let divisor = Math.floor(returned / Math.pow(8, pow));
        returned = returned % Math.pow(8, pow);
        D2O += divisor.toString();
      } while (Math.pow(8, pow) !== 1);

      /* OutCome */
      this.setOutcome(D2O);
    } else if ((from === 0 || from === 2) && to === 4) {
      let B2Q = ""; /* Binary To Quaternary */

      let returned = load.split("");
      /* Calculation */
      let chunk_start_at = 0,
        chunk_size = 2;

      while (returned.length > chunk_start_at) {
        let chunks = returned.slice(chunk_start_at, chunk_size);
        chunk_start_at = chunk_size;
        chunk_size += 2;
        B2Q += parseInt(chunks.join(""), 2);
      }

      /* OutCome */
      this.setOutcome(B2Q);
    } else if (from === 4 && to === 2) {
      let Q2B = ""; /* Quaternary To Binary */

      const returned = load.split("");
      if (
        returned.length === 1 &&
        (returned.includes("0") || returned.includes("1"))
      ) {
        Q2B += returned.join();

        /* OutCome */
        this.setOutcome(Q2B);
      } else {
        /* Calculation */
        returned.forEach((val, index) => {
          if (val === "0") {
            Q2B += "00";
          } else if (val === "1" && index === 0) {
            Q2B += "1";
          } else if (val === "1") {
            Q2B += "01";
          } else if (val === "2") {
            Q2B += "10";
          } else if (val === "3") {
            Q2B += "11";
          }
        });

        /* OutCome */
        this.setOutcome(Q2B);
      }
    } else if ((from === 0 || from === 2) && to === 8) {
      let B2D = 0; /* Binary To Decimal */
      let D2O = ""; /* Decimal To Octal */

      const returned = load.split("").reverse();
      /* Calculation  Binary To Decimal */
      returned.forEach((val) => {
        B2D += parseInt(val) * Math.pow(2, pow);
        pow += 1;
      });

      D2O = B2D.toString(8);

      /* OutCome */
      this.setOutcome(D2O);
    } else if (from === 8 && to === 2) {
      let O2D = 0; /* Octal To Decimal */
      let D2B = ""; /* Decimal To Binary */

      const returned = load.split("").reverse();
      /* Calculation Octal To Decimal */
      returned.forEach((val) => {
        O2D += parseInt(val) * Math.pow(8, pow);
        pow += 1;
      });

      D2B = O2D.toString(2);

      /* OutCome */
      this.setOutcome(D2B);
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
