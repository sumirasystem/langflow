import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import './Login.css';
import { loginSystem } from "../../controllers/API";

const Login = ({ setToken }) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginSystem(username,password);
    console.log(token);
    setToken(token);
  }

  return(
    <main className="login">
      <div className="login__col">
        <header className="login__brand">Sumira Flow</header>
        <form className="login__form" method="post" onSubmit={handleSubmit}>
          <div className="login__form-wrapper">
            <h1>Welcome</h1>
            <p>Sign in to your account.</p>
            <div className="login__field-group">
              <label className="login__label" htmlFor="user-email">Username or Email</label>
              <input className="login__field" id="user-email" type="text" name="user_email" onChange={e => setUserName(e.target.value)}/>
            </div>
            <div className="login__field-group">
              <label className="login__label" htmlFor="pass">Password</label>
              <input className="login__field" id="pass" type="password" name="pass" onChange={e => setPassword(e.target.value)} />
            </div>
            
            <button className="login__btn" type="submit" data-login="false">
              <span className="login__btn-label">Sign in</span>
              <span className="login__btn-spinner"></span>
            </button>
          </div>
        </form>
        <footer className="login__copyright">
          <p>© <span data-year>2023</span> Sumira.</p>
        </footer>
      </div>
      <div className="login__col">
          <div className="login__bg-img">
            <div className="login__testimonial">
              <p>"You don't need to know programming here. We provide you with a tool to create virtual assistants for your business."</p>
              <p>Admin Sumira</p>
              <p><small>Developer</small></p>
            </div>
          </div>
      </div>
    </main>
  )
}

export default Login;

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};