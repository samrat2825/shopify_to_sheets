import { useState } from 'react';
import Header from '../components/Header';
import '../styles/main.scss';

//helpers
import {
  authGaurdSignUp,
  authGaurdLogin,
} from '../helper/firebaseMethods/index';

const SignUpPage = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const inputHandler = (event) => {
    if (event.target.name === 'email') {
      setEmail(event.target.value);
    } else if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  };

  const submitHandlerSignUp = () => {
    authGaurdSignUp(email, password)
      .then((res) => {})
      .catch((e) => console.log(e));
  };

  const submitHandlerLogin = () => {
    authGaurdLogin(email, password)
      .then((res) => {})
      .catch((e) => console.log(e));
  };

  return (
    <div className='nav-container'>
      <Header />
      <div className='signin-container'>
        <img
          src={'/header_logo.webp'}
          className='signin-logo'
          alt='Sign In logo'
        />
        <div className='sign-in-form'>
          <div className='form-element'>
            <input
              type='text'
              placeholder='Email'
              className='form-input'
              name='email'
              onChange={inputHandler}
            ></input>
          </div>
          <div className='form-element'>
            <input
              type='password'
              placeholder='Password'
              className='form-input'
              name='password'
              onChange={inputHandler}
            ></input>
          </div>
          <div
            style={{
              flexdirection: 'row',
              display: 'flex',
              width: '100%',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
          >
            <input
              type='button'
              value='Sign Up'
              onClick={submitHandlerSignUp}
              className='Button3'
              style={{
                borderRadius: '8px',
                fontWeight: 'bold',
                marginTop: '5%',
              }}
            ></input>
            <input
              type='button'
              value='Log In'
              onClick={submitHandlerLogin}
              className='Button3'
              style={{
                borderRadius: '8px',
                fontWeight: 'bold',
                marginTop: '5%',
              }}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
