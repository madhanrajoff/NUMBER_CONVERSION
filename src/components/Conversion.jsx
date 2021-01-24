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
// Icons
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import boy from "../images/boy.gif";

const beginningState = {
  interposed: false,
  load: "",
  outcome: 0,
};

class Conversion extends Component {
  state = { from: 0, to: 0, ...beginningState };

  Types = { 10: "Decimal", 8: "Octal", 4: "Quaternary", 2: "Binary" };
  /* Copy Types */
  C_Types = { 10: "Decimal", 8: "Octal", 4: "Quaternary" };

  renovateC_Types = (del) => {
    this.C_Types = { ...this.Types };
    delete this.C_Types[del];
  };

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

    if (name === "from" && value in this.C_Types) {
      this.renovateC_Types(value);
    }

    this.setValue({
      [name]: !Number.isInteger(value) ? parseInt(value) : value,
    });
  };

  handleClick = () => {
    /* state objects */
    const { from, to, load } = this.state;

    if ((from === 0 || from === 2) && (to === 0 || to === 10)) {
      let B2D = this.binaryToDecimal(load); /* Binary To  Decimal*/

      /* OutCome */
      this.setOutcome(B2D);
    } else if (from === 10 && to === 2) {
      let D2B = this.decimalToBinary(load); /* Decimal To Binary */

      /* OutCome */
      this.setOutcome(D2B);
    } else if (from === 4 && (to === 0 || to === 10)) {
      let Q2D = this.quaternaryToDecimal(load); /* Quaternary To Decimal */

      /* OutCome */
      this.setOutcome(Q2D);
    } else if (from === 10 && to === 4) {
      let D2Q = this.decimalToQuaternary(load); /* Decimal To Quaternary */

      /* OutCome */
      this.setOutcome(D2Q);
    } else if (from === 8 && (to === 0 || to === 10)) {
      let O2D = this.octalToDecimal(load); /* Octal To Decimal */

      /* OutCome */
      this.setOutcome(O2D);
    } else if (from === 10 && to === 8) {
      let D2O = this.decimalToOctal(load); /* Decimal To Octal */

      /* OutCome */
      this.setOutcome(D2O);
    } else if ((from === 0 || from === 2) && to === 4) {
      let B2D = this.binaryToDecimal(load); /* Binary To  Decimal*/
      let D2Q = this.decimalToQuaternary(B2D); /* Decimal To Quaternary */

      /* OutCome */
      this.setOutcome(D2Q);
    } else if (from === 4 && to === 2) {
      let Q2D = this.quaternaryToDecimal(load); /* Quaternary To Decimal */
      let D2B = this.decimalToBinary(Q2D); /* Decimal To Binary */

      /* OutCome */
      this.setOutcome(D2B);
    } else if ((from === 0 || from === 2) && to === 8) {
      let B2D = this.binaryToDecimal(load); /* Binary To Decimal */
      let D2O = B2D.toString(8); /* Decimal To Octal */

      /* OutCome */
      this.setOutcome(D2O);
    } else if (from === 8 && to === 2) {
      let O2D = this.octalToDecimal(load); /* Octal To Decimal */
      let D2B = O2D.toString(2); /* Decimal To Binary */

      /* OutCome */
      this.setOutcome(D2B);
    } else if (from === 4 && to === 8) {
      let Q2D = this.quaternaryToDecimal(load); /* Quaternary To Decimal */
      let D2O = Q2D.toString(8); /* Decimal To Octal */

      /* OutCome */
      this.setOutcome(D2O);
    } else if (from === 8 && to === 4) {
      let O2D = this.octalToDecimal(load); /* Octal To Decimal */
      let D2Q = O2D.toString(4); /* Decimal To Quaternary */

      /* OutCome */
      this.setOutcome(D2Q);
    }

    this.enableInterposed(); /* disallow gif picture */
  };

  decimalToOctal = (parcel) => {
    let pow = 0; /* Power */
    let D2O = ""; /* Decimal To Octal */

    let returned = parseInt(parcel);
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

    return D2O;
  };

  decimalToQuaternary = (parcel) => {
    let pow = 0; /* Power */
    let D2Q = ""; /* Decimal To Quaternary */

    let returned = parseInt(parcel);
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

    return D2Q;
  };

  octalToDecimal = (parcel) => {
    let pow = 0; /* Power */
    let O2D = 0; /* Octal To Decimal */

    const returned = parcel.split("").reverse();
    /* Calculation */
    returned.forEach((val) => {
      O2D += parseInt(val) * Math.pow(8, pow);
      pow += 1;
    });

    return O2D;
  };

  decimalToBinary = (parcel) => {
    let pow = 0; /* Power */
    let D2B = ""; /* Decimal To Binary */

    let returned = parseInt(parcel);
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

    return D2B;
  };

  binaryToDecimal = (parcel) => {
    let pow = 0; /* Power */
    let B2D = 0; /* Binary To Decimal */

    const returned = parcel.split("").reverse();
    /* Calculation */
    returned.forEach((val) => {
      B2D += parseInt(val) * Math.pow(2, pow);
      pow += 1;
    });

    return B2D;
  };

  quaternaryToDecimal = (parcel) => {
    let pow = 0; /* Power */
    let Q2D = 0; /* Quaternary To Decimal */

    const returned = parcel.split("").reverse();
    /* Calculation */
    returned.forEach((val) => {
      Q2D += parseInt(val) * Math.pow(4, pow);
      pow += 1;
    });

    return Q2D;
  };

  octalToDecimal = (parcel) => {
    let pow = 0; /* Power */
    let O2D = 0; /* Octal To Decimal */

    const returned = parcel.split("").reverse();
    /* Calculation */
    returned.forEach((val) => {
      O2D += parseInt(val) * Math.pow(8, pow);
      pow += 1;
    });

    return O2D;
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
    const { Types, C_Types, handleChange, onInput, handleClick } = this;

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
                variant="outlined"
                className={classes.select}
              >
                {Object.keys(Types).map((key) => (
                  <option key={key} value={key}>
                    {Types[key]}
                  </option>
                ))}
              </Select>
            </Box>
            <Box className={classes.icon}>
              <ExitToAppIcon />
            </Box>
            <Box>
              <Select
                native
                value={to}
                onChange={handleChange}
                name="to"
                variant="outlined"
                className={classes.select}
              >
                {Object.keys(C_Types)
                  .reverse()
                  .map((key) => (
                    <option key={key} value={key}>
                      {C_Types[key]}
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
              variant="outlined"
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
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(3),
    },
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
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(5, 3),
    },
  },
  icon: {
    marginTop: theme.spacing(7),
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
