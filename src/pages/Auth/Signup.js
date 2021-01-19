import React, { Component } from 'react';
import Auth from './Auth';
import Input from './components/Input';

class Signup extends Component {
    state = {
        signupForm: {
            email: '',
            password: '',
            name: '',
        }

    };

    inputChangeHandler = (input, value) => {
        this.setState(prevState => {
            const updatedForm = {
                ...prevState.signupForm,
                [input]: {
                    ...prevState.signupForm[input],
                    
                }
            }
            return {
                signupForm: updatedForm,
              };
        })

    };

    inputBlurHandler = input => {
        this.setState(prevState => {
          return {
            signupForm: {
              ...prevState.signupForm,
              [input]: {
                ...prevState.signupForm[input],
                touched: true
              }
            }
          };
        });
      };
    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }
    render() {
        return (
            <Auth>
            <form onSubmit={this.handleSubmit}>
            <Input
                id="name"
                label="Your name"
                type="name"
                control="input"
                onChange={this.inputChangeHandler}
                onBlur={this.inputBlurHandler.bind(this, 'name')}
                value={this.state.signupForm['name'].value}
                valid="true"
                touched={this.state.signupForm['name'].touched}
                />
            
            <Input
                id="email"
                label="Your E-Mail"
                type="email"
                control="input"
                onChange={this.inputChangeHandler}
                onBlur={this.inputBlurHandler.bind(this, 'email')}
                value={this.state.signupForm['email'].value}
                valid="true"
                touched={this.state.signupForm['email'].touched}
                />
            <Input
                id="password"
                label="password"
                type="password"
                control="input"
                onChange={this.inputChangeHandler}
                onBlur={this.inputBlurHandler.bind(this, 'password')}
                value={this.state.signupForm['password'].value}
                valid="true"
                touched={this.state.signupForm['password'].touched}
                />
            
              </form>
            </Auth>
        )
    }
}

export default Signup;