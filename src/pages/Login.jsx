import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../Context/Context';
import '../CSS/Login.css';
import logo from '../images/logo.png';
import Loading from '../components/Loading';

function Login() {
  const [loading, setLoading] = useState(false);

  const {
    setEmail,
    setPassword,
    email,
    password } = useContext(Context);

  const num = 6;

  const jsonObj = JSON.stringify({ email });

  const history = useHistory();


  function btnEnter() {
    setLoading(true);
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', jsonObj);
    setTimeout(() => {
      history.push('/foods');
    }, 4000);
  }

  const alteraTitle = () => {
    document.title = 'Cookbook';
  }

  const validateEmail = () => (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/));

  const validatePassword = () => password.length > num;

  return (
      !loading ? (
        <main className="main-login">
          { alteraTitle() }
          <section className="clip" />
          <section className="section-form">
            <img src={ logo } alt="logo" className="img-logo" />
            <form className="form">
              <h1>Login</h1>
              <input
                className="input-login"
                type="email"
                data-testid="email-input"
                placeholder="E-mail"
                onChange={ (e) => setEmail(e.target.value) }
              />
              <input
                className="input-login"
                type="password"
                data-testid="password-input"
                placeholder="Password"
                onChange={ (e) => setPassword(e.target.value) }
              />
              <button
                disabled={ !(validateEmail() && validatePassword()) }
                type="submit"
                data-testid="login-submit-btn"
                onClick={ btnEnter }
                className="btn-login"
              >
                Enter
              </button>
            </form>
          </section>
        </main>
      )
      : (
        <Loading />
      ) 
  );
}

export default Login;
