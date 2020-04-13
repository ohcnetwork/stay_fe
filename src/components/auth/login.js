import React from "react";
import "./style.scss";
//import axios from 'axios';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
  };
  }
  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
}
handlelogin = (e) => {
  console.log(this.state.email+"  "+this.state.password );
  axios.post('#todolinkto the database' , {email: this.state.email,password: this.state.password})
    .then(res => {
      console.log(res.data);
  })

}
    render() {
   
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">

          <div className="form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" value={this.state.email}  onChange={e => this.handleChange(e)} placeholder="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} placeholder="password" />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" onClick={this.handlelogin} className="btn">
            Login
          </button>
        </div>
      </div>
    );
  }
}
