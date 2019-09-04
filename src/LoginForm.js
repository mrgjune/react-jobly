import React, { Component } from "react";


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      first_name: "" || null,
      last_name: "" || null,
      email: "" || null,
      formType: "login"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayLogin = this.displayLogin.bind(this);
    this.displaySignup = this.displaySignup.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // FIXME: successful login takes user to /, should go to /jobs
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.formType === "login") {
      this.props.authenticate(this.state);
    } else {
      this.props.register(this.state);
    }
    this.props.history.push("/jobs");
  }

  displayLogin() {
    this.setState({
      formType: "login"
    });
  }

  displaySignup() {
    this.setState({
      formType: "signup"
    });
  }

  render() {    
    if (this.state.formType === "signup") {
      return (
        <div>
          <button id="login" onClick={this.displayLogin} className="btn btn-info">Login</button>
          <button id="sign-up" onClick={this.displaySignup} className="btn btn-info">Signup</button>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="username"
              className="form-control"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              className="form-control"
              value={this.state.password}
              onChange={this.handleChange}
            />

            <input
              type="text"
              name="first_name"
              placeholder="first name"
              className="form-control"
              value={this.state.first_name}
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="last_name"
              placeholder="last name"
              className="form-control"
              value={this.state.last_name}
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="email"
              placeholder="email"
              className="form-control"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <button
              type="submit"
              className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      )
    }
    return (
      <div>
        <button id="login" onClick={this.displayLogin} className="btn btn-info">Login</button>
        <button id="sign-up" onClick={this.displaySignup} className="btn btn-info">Signup</button>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="username"
            className="form-control"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            className="form-control"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button
            type="submit"
            className="btn btn-primary">
            Submit
            </button>
        </form>
      </div>
    )
  }
}

export default LoginForm; 