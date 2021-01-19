import React, { Component } from 'react';

import Auth from './Auth';

class Login extends Component {
    state = {
        email: '',
        password: '',
        name: '',

    };

    inputChangeHandler = () => {};

    inputBlurHandler = () => {};

    render() {
        return (
          <Auth>
              <form>

              </form>
          </Auth>
        )
    }
}