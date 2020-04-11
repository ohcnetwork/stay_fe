import React from "react";
import loginImg from "../../login.svg";
import "./style.scss";

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: '',
      pass: '',
      repass:'',
      email:''
  };
  }
  handleSignup = (e) => {
    console.log(this.state.uname+"  "+this.state.pass);
  
  }
  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
}
  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Name</label>
              <input type="text" name="uname" onChange={e => this.handleChange(e)}  value={this.state.uname} placeholder="username" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" onChange={e => this.handleChange(e)} value={this.state.email} placeholder="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="pass" onChange={e => this.handleChange(e)} value={this.state.pass} placeholder="password" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Confirm Password</label>
              <input type="password" name="repass"  onChange={e => this.handleChange(e)} value={this.state.repass} placeholder="confirm password" />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button"  onClick={this.handleSignup} className="btn">
            Register
          </button>
        </div>
      </div>
    );
  }
}
