import React, { useState } from 'react';

const Login = ({ login, auth })=> {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(true);

  const _login = async(ev)=> {
    ev.preventDefault();
    try {
      await login({ username, password });
      setError(null);
    }
    catch(ex){
      if (ex) {
        setError('Invalid username or password. Please try again.');
      } else {
        setError(ex.response.data.error || 'An unexpected error has occurred.');
      }
    }
    setShowLoginForm(true)
  }

    

    const closeLoginForm = () => {
      setShowLoginForm(false);
    };
    
    return showLoginForm ? (
      <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-lg">
        <div className="relative bg-white p-4 rounded-md shadow-md">
          <button
            onClick={closeLoginForm}
            className="absolute top-2 right-2 text-black hover:text-red-950 cursor-pointer p-2 font-bold"
          >
            X
          </button>
          <form onSubmit={_login}>
            <input
              placeholder ="username"
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
              className="p-2 mb-2 border border-gray-700 rounded-md w-40 placeholder-gray-700"
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              className="p-2 mb-2 border border-gray-700 rounded-md w-40 placeholder-gray-700"
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button disabled={!username || !password} type="submit" className="bg-red-950 text-white px-4 py-2 rounded-md mt-8">
              Login
            </button>
          </form>
        </div>
      </div>
    ) : null;
  };
  
  
  export default Login;