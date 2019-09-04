import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import NavBar from "./NavBar";
import JoblyApi from "./JoblyApi";
import jwt from 'jsonwebtoken';
import UserContext from "./userContext";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currUser: {},
      isLoggedIn: false
    };
    this.authenticate = this.authenticate.bind(this);
    this.register = this.register.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  async componentDidMount() {
    await this.authenticate();
  }

  /** 
    checks for token in localStorage: if present, gets currUser info from db
    and keeps user logged in.
    if no token present, takes username and password from login form,
    authenticates user, sets token.
  */
  async authenticate(userData) {
    if (localStorage.token) {
      let decodedToken = jwt.decode(localStorage.token);
      let currentUser = await JoblyApi.getCurrentUser(decodedToken.username);

      this.setState({
        currUser: currentUser,
        isLoggedIn: true
      });
    }
    if (userData) {
      const token = await JoblyApi.authenticateUser(userData);
      localStorage.setItem('token', token);

      let currentUser = await JoblyApi.getCurrentUser(userData.username);
      this.setState({ currUser: currentUser, isLoggedIn: true });
    }
  }

  async register(userData) {
    const { username, password, first_name, last_name, email } = userData;
    /**TODO: put this in own object in loginForm */
    const user = {
      username: username,
      password: password,
      first_name: first_name,
      last_name: last_name,
      email: email
    }
    const token = await JoblyApi.registerUser(user);
    localStorage.setItem('token', token);
    const currentUser = {
      username: username,
      first_name: first_name,
      last_name: last_name,
      email: email
    }
    this.setState({ currUser: currentUser, isLoggedIn: true });
  }

  handleLogout() {
    localStorage.removeItem("token");
    this.setState({ currUser: {}, isLoggedIn: false });
  }

  render() {
    return (
      <UserContext.Provider value={this.state.currUser}>
        <div>
          <BrowserRouter>
            <NavBar logout={this.handleLogout} isLoggedIn={this.state.isLoggedIn} />
            <div className="container">
              <Routes authenticate={this.authenticate} register={this.register} />
            </div>
          </BrowserRouter>
        </div>
      </UserContext.Provider>
    );
  }
}

export default App;
