import {
  Button,
  Card,
  Container,
  Grid,
  TextField,
  withStyles,
} from "@material-ui/core";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { loginLocal } from "../../../controller/userManager";

const styles = (theme) => ({
  card: {
    padding: theme.spacing(4),
    minWidth: 300,
  },
  container: {
    alignItems: "center",
    maxWidth: 500,
    height: "100vh",
    display: "flex",
  },
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "guest",
      password: "guest",

      isServerErrormessage: false,
      ServerErrormessage: null,

      isUsernameError: false,
      usernameErrorMessage: "",

      isPasswordError: false,
      passwordErrorMessage: "",

      token: "",
    };
    this.usernameRef = React.createRef();
  }

  validateForm() {
    return (
      this.state.username.length >= 1 &&
      this.state.password.length >= 1 &&
      !this.state.isUsernameError &&
      !this.state.isPasswordError
    );
  }

  validateUsername = () => {
    if (this.state.username.length >= 1 && this.state.username.length <= 20) {
      this.setState({
        isUsernameError: false,
        usernameErrorMessage: "",
      });
      return true;
    } else {
      this.setState({
        isUsernameError: true,
        usernameErrorMessage: "Username must be 1-20 characters long.",
      });
      return false;
    }
  };

  validatePassword = () => {
    if (this.state.password.length >= 1) {
      this.setState({
        isPasswordError: false,
        passwordErrorMessage: "",
      });
      return false;
    } else {
      this.setState({
        isPasswordError: true,
        passwordErrorMessage: "Passwords can not be empty.",
      });
      return true;
    }
  };

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
    if (name === "username") {
      this.setState({
        isUsernameError: false,
        usernameErrorMessage: "",
      });
    } else if (name === "password") {
      this.setState({
        isPasswordError: false,
        passwordErrorMessage: "",
      });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await loginLocal(this.state.username, this.state.password);
      console.log("login successfully");
      console.log(res.accessToken);
      this.setState({
        token: res.accessToken,
      });
      this.props.history.push("/");
    } catch (err) {
      console.log(err.response.data.message);
      const errorMessage = err.response.data.message;
      this.setState({
        isPasswordError: true,
        passwordErrorMessage: errorMessage,
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.container}>
        <Card className={classes.card}>
          <h1>Login</h1>
          <p className="text-muted">Sign In to your account</p>
          <TextField
            inputRef={this.usernameRef}
            id="username"
            label="Username"
            type="string"
            autoFocus={true}
            value={this.state.username}
            onChange={this.handleChange("username")}
            onBlur={this.validateUsername}
            margin="normal"
            fullWidth
            error={this.state.isUsernameError}
            helperText={this.state.usernameErrorMessage}
          />

          <TextField
            label="Password"
            id="password"
            value={this.state.password}
            onChange={this.handleChange("password")}
            onBlur={this.validatePassword}
            type="password"
            margin="normal"
            fullWidth
            error={this.state.isPasswordError}
            helperText={this.state.passwordErrorMessage}
          />
          <Grid container>
            <Grid item xs={6}>
              <br />
              <Button
                id="loginButton"
                variant="contained"
                color="primary"
                disabled={!this.validateForm()}
                onClick={this.handleSubmit}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={6} style={{ textAlign: "right" }}>
              <br />
              <Link to="/forgetpassword">
                <Button id="forgetPasswordButton">Forgot password?</Button>
              </Link>
              <Link to="/register">
                <Button id="registerButton" color="primary">
                  Register Now!
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Card>
      </Container>
    );
  }
}

export default withStyles(styles)(Login);
