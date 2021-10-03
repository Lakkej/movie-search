import {
  Button,
  Container,
  Alert,
  TextField,
  Typography,
  IconButton,
  OutlinedInput,
  FormControl,
  InputLabel,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const useStyles = makeStyles((theme) => ({
  container: {},
  form: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "15px 50px",
  },
  movieSearch: {
    color: theme.palette.primary.main,
  },
}));

function Login({ token, handleLogin }) {
  const classes = useStyles();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(true);

  const handleTextFieldChange = (event) => {
    setLoginData((prevState) => {
      return { ...prevState, [event.target.id]: event.target.value };
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <form className={classes.form}>
        <Typography variant="h1" className={classes.movieSearch}>
          Movie Search
        </Typography>
        <Alert
          style={{ visibility: `${token === "error" ? "visible" : "hidden"}` }}
          severity="warning"
        >
          Your username and password don't match!
        </Alert>

        <TextField
          required
          id="username"
          label="Username"
          value={loginData.username}
          onChange={handleTextFieldChange}
          margin="dense"
        />
        <FormControl variant="outlined" margin="dense">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            required
            id="password"
            type={showPassword ? "password" : "text"}
            label="Password"
            value={loginData.password}
            onChange={handleTextFieldChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant={"contained"}
          onClick={(event) => {
            event.preventDefault();
            handleLogin(
              Buffer.from(
                `${loginData.username}:${loginData.password}`
              ).toString("base64")
            );
          }}
        >
          Click me
        </Button>
      </form>
    </Container>
  );
}

export default Login;
