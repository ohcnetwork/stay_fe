import React from "react";
import "./style.scss";
import InputMask from 'react-input-mask';
//import axios from 'axios';





export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: '',
      pass: '',
      repass:'',
      email:'',
      mobile:'',
      date: new Date(),
      date_of_birth: ''   

  };
  this.handleDateOfBirth = this.handleDateOfBirth.bind(this);   

  }
  handleSignup = (e) => {
    console.log(this.state.uname+"  "+this.state.pass+" "+this.state.date_of_birth);
/*    axios.post('#todo link to database', {name:this.state.uname,password:this.state.pass,confirm:this.state.repass,email:this.state.email})\
    .then(res => {
      console.log(res.data);
    })*/
  
  }
  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
}
handleDateOfBirth(e) {
  this.setState({
    date_of_birth: e.target.value
  });

  }


  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">

          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Name</label>
              <input type="text" name="uname" onChange={e => this.handleChange(e)}  value={this.state.uname} placeholder="username" />
            </div>
            <div className="form-group">
              <label htmlFor="username">Mobile No</label>
              <input type="text" name="mobile" onChange={e => this.handleChange(e)} minLength={10} maxLength={10} value={this.state.mobile} placeholder="Mobile NUmber" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" onChange={e => this.handleChange(e)} value={this.state.email} placeholder="email" />
            </div>
            <div className="form-group">
            <label htmlFor="date">Date of birth</label>
            <InputMask  value={this.state.date_of_birth} mask="99/99/9999" placeholder="01/01/2001" onChange={this.handleDateOfBirth} />
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
