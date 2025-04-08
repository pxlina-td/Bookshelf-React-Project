import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/auth.css'; 
import { useRegister } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';

const initialValues = {
  name: '',
  email: '',
  password: '',
  repassword: '',
  profilepic: '',
  bio: ''
};

const Register = () => {
	const [error, setError] = useState('');
  const register = useRegister();
  const navigate = useNavigate();

  const registerHandler = async(values) => {
		const { email, password, repassword, name, profilepic, bio } = values;
		if(password !== repassword){
			setError('Passwords do not match!');
			return;
		}

    try {
      await register(email, password, name, profilepic, bio);
      navigate('/');
    } catch (err){
			setError(err.message);
      console.log(err.message);
    }
  };

	const {values, changeHandler, submitHandler} = useForm(initialValues,registerHandler)

  return (
    <div className="auth-container">
      <div className="auth-background"></div>
      <h1>Register</h1>
      <form onSubmit={submitHandler} className="auth-form">
        <input
          type="text"
					id="name"
          name="name"
          value={values.name}
          onChange={changeHandler}
          placeholder="Full Name"
          required
        />
         <input
          type="email"
					id="email"
          name="email"
          value={values.email}
          onChange={changeHandler}
          placeholder="email@gmail.com"
          required
        />
        <input
          type="password"
					id="password"
          name="password"
          value={values.password}
          onChange={changeHandler}
          placeholder="Password"
          required
        />
        <input
          type="password"
					id="repassword"
          name="repassword"
          value={values.repassword}
          onChange={changeHandler}
          placeholder="Repeat Password"
          required
        />
        <input
          type="url"
					id="profilepic"
          name="profilepic"
          value={values.profilepic}
          onChange={changeHandler}
          placeholder="Profile Picture URL (optional)"
        />
        <textarea
          name="bio"
					id="bio"
          value={values.bio}
          onChange={changeHandler}
          placeholder="Bio (optional)"
        />
				{error && (
					<p className='error-message'>
						<span>{error}</span>
					</p>
				)}
        <button type="submit" className="auth-button">Register</button>
      </form>
    </div>
  );
};

export default Register;
