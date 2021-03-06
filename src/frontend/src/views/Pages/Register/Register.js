import { MenuItem, TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Col, Container, Form, Row } from "reactstrap";
import {
  checkEmail,
  checkUsername,
  getAllGroups,
  getAllOrganizations,
  signUpLocal,
} from "../../../controller/userManager";

class Register extends Component {
  constructor(props) {
    super(props);
    this.setup = props.params.mode === "setup";
    this.state = {
      username: "",
      email: "@ontario.ca",
      firstName: "",
      lastName: "",
      password: "",
      repeatPassword: "",
      phoneNumber: "",
      selectedGroupNumber: 1,
      dbGroups: [],
      selectedOrganization: null,
      dbOrganizations: [],
      selectedOrganizations: [],

      isServerErrormessage: false,
      ServerErrormessage: null,

      isUsernameError: false,
      usernameErrorMessage: "",
      isEmailError: false,
      emailErrorMessage: "",
      isPasswordError: false,
      passwordErrorMessage: "",
      isRepeatPasswordError: false,
      repeatPasswordErrorMessage: "",
      isGroupNumberError: false,
      groupNumberErrorMessage: "",
    };
    this.initialGroups();
  }

  initialGroups = () => {
    getAllGroups().then((dbGroups) => {
      if (dbGroups[0]) {
        getAllOrganizations().then((dbOrganizations) => {
          this.setState({
            dbGroups,
            selectedGroupNumber: dbGroups[0].groupNumber,
            dbOrganizations,
            selectedOrganizations: dbOrganizations,
            selectedOrganization: dbOrganizations[0].name,
          });
        });
      }
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    signUpLocal(
      this.setup,
      this.state.username,
      this.state.password,
      this.state.firstName,
      this.state.lastName,
      this.state.selectedOrganization,
      this.state.email,
      this.state.phoneNumber,
      this.state.selectedGroupNumber
    )
      .then((response) => {
        this.props.history.push(response.redirect);
      })
      .catch((err) => {
        if (typeof err.response.data.message === "string") {
          const serverErrorMessage = err.response.data.message;
          console.log(serverErrorMessage);
          if (serverErrorMessage.toLowerCase().includes("username")) {
            this.setState({
              isUsernameError: true,
              usernameErrorMessage: serverErrorMessage,
            });
          } else if (serverErrorMessage.toLowerCase().includes("email")) {
            this.setState({
              isEmailError: true,
              emailErrorMessage: serverErrorMessage,
            });
          } else if (
            serverErrorMessage.toLowerCase().includes("group number")
          ) {
            this.setState({
              isGroupNumberError: true,
              ServerErrormessage: serverErrorMessage,
            });
          } else {
            this.setState({
              isServerErrormessage: true,
              ServerErrormessage: serverErrorMessage,
            });
          }
        } else {
          this.setState({
            isServerErrormessage: true,
            ServerErrormessage: err.toString(),
          });
        }
      });
  };

  validateUsername = () => {
    // local validate
    const username = this.state.username;
    if (username.length >= 1 && username.length <= 50) {
      // validate in back-end
      console.log("checking username");
      checkUsername(username).then((response) => {
        const serverMessage = response.data.message;
        if (serverMessage) {
          this.setState({
            isUsernameError: true,
            usernameErrorMessage: serverMessage,
          });
          console.log(serverMessage);
          return false;
        } else {
          this.setState({
            isUsernameError: false,
            usernameErrorMessage: "",
          });
          return true;
        }
      });
    } else {
      this.setState({
        isUsernameError: true,
        usernameErrorMessage: "Username must be 1-50 characters long.",
      });
      return false;
    }
  };

  validateEmail = () => {
    const email = this.state.email;
    if (
      email !== "@ontario.ca" &&
      email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
    ) {
      // validate in back-end
      checkEmail(email).then((response) => {
        const serverMessage = response.data.message;
        if (serverMessage) {
          this.setState({
            isEmailError: true,
            emailErrorMessage: serverMessage,
          });
          console.log(serverMessage);
          return false;
        } else {
          this.setState({
            isEmailError: false,
            emailErrorMessage: "",
          });
          return true;
        }
      });
    } else {
      this.setState({
        isEmailError: true,
        emailErrorMessage: "Email is invalid.",
      });
      return false;
    }
  };

  validatePassword = () => {
    if (this.state.password.length >= 1) {
      if (this.state.repeatPassword.length >= 1) {
        // validate the repeatPassword when it is not empty
        this.validateRepeatPassword();
      } else {
        this.setState({
          isPasswordError: false,
          passwordErrorMessage: "",
        });
        return false;
      }
    } else {
      this.setState({
        isPasswordError: true,
        passwordErrorMessage: "Passwords can not be empty.",
      });
      return true;
    }
  };

  validateRepeatPassword = () => {
    if (this.state.password === this.state.repeatPassword) {
      this.setState({
        isRepeatPasswordError: false,
        repeatPasswordErrorMessage: "",
      });
      return false;
    } else {
      this.setState({
        isRepeatPasswordError: true,
        repeatPasswordErrorMessage: "Passwords must be identical.",
      });
      return true;
    }
  };

  validateGroupNumber = () => {
    if (this.state.selectedGroupNumber >= 1) {
      this.setState({
        isGroupNumberError: false,
        groupNumberErrorMessage: "",
      });
      return false;
    } else {
      this.setState({
        isGroupNumberError: true,
        groupNumberErrorMessage: "GroupNumber can not be empty or 0.",
      });
      return true;
    }
  };

  validateAllInputs() {
    return (
      this.state.username === "" ||
      this.state.password === "" ||
      this.state.repeatPassword === "" ||
      this.state.isUsernameError ||
      this.state.isEmailError ||
      this.state.isPasswordError ||
      this.state.isRepeatPasswordError ||
      this.state.isGroupNumberError
    );
  }

  handleChange = (name) => (event) => {
    const value = event.target.value;
    this.setState({
      [name]: value,
    });

    if (name === "username") {
      this.setState({
        isUsernameError: false,
        usernameErrorMessage: "",
      });
    } else if (name === "email") {
      this.setState({
        isEmailError: false,
        emailErrorMessage: "",
      });
    } else if (name === "password") {
      this.setState({
        isPasswordError: false,
        passwordErrorMessage: "",
        isRepeatPasswordError: false,
        repeatPasswordErrorMessage: "",
      });
    } else if (name === "repeatPassword") {
      console.log("reapeat");
      this.setState({
        isRepeatPasswordError: false,
        repeatPasswordErrorMessage: "",
      });
    } else if (name === "groupNumber") {
      // FIXME: use local data instead of remote data
      let selectedOrganizations = [];
      this.state.dbOrganizations.forEach((o) => {
        if (o.groupNumber === value) {
          selectedOrganizations.push(o);
        }
      });
      this.setState({
        selectedOrganizations,
        selectedOrganization: selectedOrganizations[0].name,
        isGroupNumberError: false,
        groupNumberErrorMessage: "",
      });
    }
  };

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.handleSubmit}>
                    <h1>{this.setup ? "Setup" : "Register"}</h1>
                    <p className="text-muted">Create your account</p>

                    <TextField
                      label="Username"
                      type="string"
                      required
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
                      label="Email"
                      type="email"
                      required={true}
                      value={this.state.email}
                      onChange={this.handleChange("email")}
                      onBlur={this.validateEmail}
                      margin="normal"
                      fullWidth
                      error={this.state.isEmailError}
                      helperText={this.state.emailErrorMessage}
                    />

                    <TextField
                      label="First Name"
                      type="string"
                      required={false}
                      value={this.state.firstName}
                      onChange={this.handleChange("firstName")}
                      margin="normal"
                      fullWidth
                    />

                    <TextField
                      label="Last Name"
                      type="string"
                      required={false}
                      value={this.state.lastName}
                      onChange={this.handleChange("lastName")}
                      margin="normal"
                      fullWidth
                    />

                    <TextField
                      label="Phone Number"
                      type="string"
                      required={false}
                      value={this.state.phoneNumber}
                      onChange={this.handleChange("phoneNumber")}
                      margin="normal"
                      fullWidth
                    />

                    <TextField
                      label="Password"
                      value={this.state.password}
                      onChange={this.handleChange("password")}
                      onBlur={this.validatePassword}
                      type="password"
                      required={true}
                      margin="normal"
                      fullWidth
                      error={this.state.isPasswordError}
                      helperText={this.state.passwordErrorMessage}
                    />

                    <TextField
                      label="RepeatPassword"
                      value={this.state.repeatPassword}
                      onChange={this.handleChange("repeatPassword")}
                      onBlur={this.validateRepeatPassword}
                      type="password"
                      required={true}
                      margin="normal"
                      fullWidth
                      error={this.state.isRepeatPasswordError}
                      helperText={this.state.repeatPasswordErrorMessage}
                    />

                    <TextField
                      select
                      label="Group Name"
                      value={this.state.selectedGroupNumber}
                      onChange={this.handleChange("groupNumber")}
                      margin="normal"
                      fullWidth
                    >
                      {this.state.dbGroups.map((option) => (
                        <MenuItem
                          key={option.groupNumber}
                          value={option.groupNumber}
                        >
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      select
                      InputLabelProps={{ shrink: true }}
                      label="Organization"
                      value={this.state.selectedOrganization}
                      onChange={this.handleChange("organization")}
                      margin="normal"
                      fullWidth
                    >
                      {this.state.selectedOrganizations.map((option) => (
                        <MenuItem key={option._id} value={option.name}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>

                    <br />
                    <Button
                      variant="outlined"
                      color="primary"
                      disabled={this.validateAllInputs()}
                      onSubmit={this.handleSubmit}
                      block
                    >
                      Create Account
                    </Button>

                    <Typography component="p" color="error">
                      {this.state.ServerErrormessage}
                    </Typography>
                    {this.setup ? null : (
                      <Link to="/login">
                        <Button color="link">
                          <span>Already have an account?</span>
                        </Button>
                      </Link>
                    )}
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
