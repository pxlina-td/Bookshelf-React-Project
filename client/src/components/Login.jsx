import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';

export default function Login() {
  const login = useLogin();
  const navigate = useNavigate();
  const {values, changeHandler, submitHandler} = useForm(
    {email:'', password: ''},
    async ({email,password})=>{
      try {
        await login(email, password);
        navigate('/');
      } catch(err){
        console.log(err.message);
      }
    }
  );

  return (
    <div className="auth-container">
      <div className="auth-background"></div>
      <h1>Log in</h1>
      <form onSubmit={submitHandler} className="auth-form">
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={changeHandler}
          placeholder="email@gmail.com"
          required
        />
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={changeHandler}
          placeholder="password"
          required
        />
        <button type="submit" className="auth-button">Log in</button>
      </form>
    </div>
  );
};
