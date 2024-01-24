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
    <div className="absolute top-0 right-0 p-4 bg-white rounded-md shadow-md">
      <form onSubmit={_login}>
        <input
          placeholder="username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
          className="p-2 mb-2 border border-gray-300 rounded-md w-40"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          className="p-2 mb-2 border border-gray-300 rounded-md w-40"
        />
        <button disabled={!username || !password} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Login
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};
export default Login;
