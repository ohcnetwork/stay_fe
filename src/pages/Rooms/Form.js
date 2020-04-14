import React from "react";
import './style.css';

import DateRangePicker from 'react-daterange-picker'
import 'react-daterange-picker/dist/css/react-calendar.css'


export default class Form extends React.Component {
  
    constructor(props) {
      super(props);
      
      this.state = {
        username: 'jasonmalfatto@moduscreate.com',
        password: '',
        start_date:'',
        end_date:'',
        passwordConfirm: ''
      };
      
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e) {
      e.target.classList.add('active');
      
      this.setState({
        [e.target.name]: e.target.value
      });
      
    }
    
    handleSubmit(e) {    
      e.preventDefault();
      alert("FROM "+this.start_date+" TO "+this.end_date);

    }


  onSelect = dates => {this.setState({dates});
  console.log(dates.start._d);
  this.start_date=dates.start._d;
  console.log(dates.end._d);
  this.end_date=dates.end._d;
  }
  


  
    render() {

      return (
        <form className="x1" novalidate>
        <div className="form-group">
                <DateRangePicker
          onSelect={this.onSelect}
          value={this.state.dates}
        />
        </div>
          <div className="form-group">
            <label id="usernameLabel">Username</label>
            <input className="form-control"
              type="email"
              name="username"
              ref="username"
              value={ this.state.username } 
              onChange={ this.handleChange }
              required />
          </div>
          
          <button className="btn btn-primary"
            onClick={ this.handleSubmit }>Confirm</button>
        </form>
      );
    }
  }

