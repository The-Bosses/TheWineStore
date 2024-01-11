import React, { useState } from 'react';

const Login = ({ login })=> {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const _login = async(ev)=> {
    ev.preventDefault();
    try {
      await login({ username, password });
      setError(null);
    }
    catch(ex){
      if (ex.response.status === 401) {
        setError('Invalid username or password. Please try again.');
      } else {
        setError(ex.response.data.error || 'An unexpected error has occurred.');
      }
    }
  }

  return (
    <form onSubmit={ _login }>
      <input
        placeholder='username'
        value={ username }
        onChange={ ev => setUsername(ev.target.value)}
      />
      <input
        type='password'
        placeholder='password'
        value={ password }
        onChange={ ev => setPassword(ev.target.value)}
      />
      <button disabled={!username || !password}>Login</button>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </form>
  );
}

export default Login;
